from __future__ import annotations

import argparse
import json

from ai_bidding_assistant.alerting import build_alert, send_alert
from ai_bidding_assistant.checkpoints import (
    run_task4_document_analysis,
    run_task7_content_generation,
    run_task11_core_integration,
)
from ai_bidding_assistant.error_handling import handle_exception
from ai_bidding_assistant.human_review import capture_review_decision, present_for_review
from ai_bidding_assistant.models import Content
from ai_bidding_assistant.pipeline import run_pipeline
from ai_bidding_assistant.resilience import (
    backup_aiba_dir,
    recover_from_latest,
    recover_from_path,
    restore_aiba_dir,
)
from ai_bidding_assistant.workflow_state import (
    init_state,
    load_state,
    save_state,
    can_transition,
    transition,
    rollback,
)
from ai_bidding_assistant.models import WorkflowPhase


def _print(obj) -> None:
    print(json.dumps(obj if isinstance(obj, dict) else obj.to_dict(), ensure_ascii=False, indent=2))


def main() -> int:
    parser = argparse.ArgumentParser(prog="ai_bidding_assistant.cli")
    sub = parser.add_subparsers(dest="cmd", required=True)

    # pipeline
    p_pipe = sub.add_parser("pipeline")
    p_pipe.add_argument("--tender-file", required=True)
    p_pipe.add_argument("--section", default="demo")
    p_pipe.add_argument("--audit-log", default="./.aiba/pipeline_audit.jsonl")

    # checkpoints
    p_ck = sub.add_parser("checkpoint")
    p_ck.add_argument("--task", required=True, choices=["4", "7", "11"])
    p_ck.add_argument("--file", help="Input file for task 4/7")
    p_ck.add_argument("--section", default="demo")

    # alert
    p_alert = sub.add_parser("alert")
    p_alert.add_argument("--message", required=True)
    p_alert.add_argument("--severity", default="critical")
    p_alert.add_argument("--log-file", default="./.aiba/alerts.jsonl")

    # resilience
    sub.add_parser("backup")
    r_restore = sub.add_parser("restore")
    r_restore.add_argument("--from-path", required=True)
    sub.add_parser("recover-from-latest")
    r_rec = sub.add_parser("recover-from")
    r_rec.add_argument("--path", required=True)

    # workflow state
    sub.add_parser("wf-init")
    wf_show = sub.add_parser("wf-show")
    wf_show.add_argument("--path", default="./.aiba/workflow_state.json")
    wf_trans = sub.add_parser("wf-transition")
    wf_trans.add_argument("--to", required=True, choices=[p.value for p in WorkflowPhase])
    wf_trans.add_argument("--path", default="./.aiba/workflow_state.json")
    wf_rb = sub.add_parser("wf-rollback")
    wf_rb.add_argument("--path", default="./.aiba/workflow_state.json")

    # human review (manual)
    hr = sub.add_parser("human-review")
    hr.add_argument("--content-id", required=True)
    hr.add_argument("--decision", required=True, choices=["approve", "reject", "other"])
    hr.add_argument("--comment", default="")
    hr.add_argument("--log-file", default="./.aiba/review_audit.jsonl")

    args = parser.parse_args()

    try:
        if args.cmd == "pipeline":
            res = run_pipeline(
                tender_file=args.tender_file,
                section=args.section,
                audit_log_path=args.audit_log,
            )
            _print(res)
            return 0

        if args.cmd == "checkpoint":
            if args.task == "4":
                if not args.file:
                    raise SystemExit("task 4 requires --file")
                res = run_task4_document_analysis(file_path=args.file)
            elif args.task == "7":
                if not args.file:
                    raise SystemExit("task 7 requires --file")
                res = run_task7_content_generation(tender_file=args.file, section=args.section)
            else:
                res = run_task11_core_integration()
            _print(res if isinstance(res, dict) else res.to_dict())
            return 0

        if args.cmd == "alert":
            alert = build_alert(message=args.message, severity=args.severity, source={"cli": True})
            res = send_alert(alert, path=args.log_file)
            _print(res.to_dict())
            return 0

        if args.cmd == "backup":
            res = backup_aiba_dir()
            _print(res.to_dict())
            return 0

        if args.cmd == "restore":
            res = restore_aiba_dir(args.from_path)
            _print(res.to_dict())
            return 0

        if args.cmd == "recover-from-latest":
            res = recover_from_latest()
            _print(res.to_dict())
            return 0

        if args.cmd == "recover-from":
            res = recover_from_path(args.path)
            _print(res.to_dict())
            return 0

        if args.cmd == "wf-init":
            res = init_state()
            _print(res.to_dict())
            return 0

        if args.cmd == "wf-show":
            res = load_state(args.path)
            _print(res.to_dict())
            return 0

        if args.cmd == "wf-transition":
            state = load_state(args.path)
            decision = can_transition(state, WorkflowPhase(args.to))
            if decision.get("allowed"):
                new_state = transition(state, WorkflowPhase(args.to))
                save_state(new_state, path=args.path)
                _print({"status": "MOVED", "state": new_state.to_dict()})
            else:
                _print({"status": "HALTED", **decision})
            return 0

        if args.cmd == "wf-rollback":
            state = load_state(args.path)
            res = rollback(state)
            _print(res)
            return 0

        if args.cmd == "human-review":
            # placeholder content; no generation
            content = Content(
                id=args.content_id,
                type="placeholder",
                text="[REQUIRES HUMAN CONFIRMATION] (manual review placeholder)",
                sourceReferences=[],
                generationMetadata={},
                reviewStatus="requires_human_review",
                approvalHistory=[],
            )
            from ai_bidding_assistant.traceability_system.store import JsonlAuditLogStore

            store = JsonlAuditLogStore(args.log_file)
            session = present_for_review(content, review_type="content", reviewer={}, store=store)
            decided = capture_review_decision(
                session,
                decision=args.decision,
                reviewer={},
                comment=args.comment,
                store=store,
            )
            out = decided.to_dict()
            if hasattr(out.get("timestamp"), "isoformat"):
                out["timestamp"] = out["timestamp"].isoformat()
            _print(out)
            return 0

    except SystemExit:
        raise
    except Exception as exc:  # noqa: BLE001
        report = handle_exception(
            exc=exc,
            steps_completed=[{"task": 0, "status": "STARTED"}],
            context={"cmd": args.cmd},
            preserve_path="./.aiba/work_state.json",
        )
        _print(report.to_dict())
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())


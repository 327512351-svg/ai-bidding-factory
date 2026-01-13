from __future__ import annotations

import argparse
import json

from ai_bidding_assistant.error_handling import handle_exception
from ai_bidding_assistant.alerting import build_alert, send_alert

from .orchestrator import run_pipeline


def main() -> int:
    """
    CLI for Task 10 dry-run orchestrator.

    Usage:
      PYTHONPATH=.../src python3 -m ai_bidding_assistant.pipeline --tender-file <file> --section <section>
    """

    parser = argparse.ArgumentParser(prog="ai_bidding_assistant.pipeline")
    parser.add_argument("--tender-file", required=True, help="Path to tender document file.")
    parser.add_argument("--section", default="demo", help="Section type for placeholder content.")
    parser.add_argument(
        "--audit-log",
        default="./.aiba/pipeline_audit.jsonl",
        help="Path to append-only audit log JSONL file (Task 8 placeholder).",
    )
    args = parser.parse_args()

    try:
        result = run_pipeline(
            tender_file=args.tender_file,
            section=args.section,
            audit_log_path=args.audit_log,
        )
        print(json.dumps(result, ensure_ascii=False, indent=2))
    except Exception as exc:  # noqa: BLE001
        report = handle_exception(
            exc=exc,
            steps_completed=[{"task": 0, "status": "STARTED"}],
            context={"tender_file": args.tender_file, "section": args.section},
            preserve_path="./.aiba/work_state.json",
        )
        # Send alert (placeholder) without changing output schema.
        alert = build_alert(
            message=f"Pipeline error: {report.code if hasattr(report, 'code') else 'unknown'}",
            severity="critical",
            source={"pipeline": True},
            recovery_procedure="Inspect ErrorReport and preserved state; rerun after manual fix.",
            escalation="Not escalated (placeholder)",
        )
        send_alert(alert)
        print(json.dumps(report.to_dict(), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())


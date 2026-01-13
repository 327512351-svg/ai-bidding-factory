from __future__ import annotations

import argparse
import json

from ai_bidding_assistant.error_handling import handle_exception

from .orchestrator import run_workflow


def main() -> int:
    parser = argparse.ArgumentParser(prog="ai_bidding_assistant.app")
    parser.add_argument("--tender-file", required=True)
    parser.add_argument("--section", default="demo")
    parser.add_argument("--audit-log", default="./.aiba/app_audit.jsonl")
    args = parser.parse_args()

    try:
        result = run_workflow(
            tender_file=args.tender_file,
            section=args.section,
            audit_log_path=args.audit_log,
        )
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 0
    except Exception as exc:  # noqa: BLE001
        report = handle_exception(
            exc=exc,
            steps_completed=[{"task": 0, "status": "STARTED"}],
            context={"tender_file": args.tender_file, "section": args.section, "app": True},
            preserve_path="./.aiba/work_state.json",
        )
        print(json.dumps(report.to_dict(), ensure_ascii=False, indent=2))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())


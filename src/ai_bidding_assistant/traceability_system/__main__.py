from __future__ import annotations

import argparse
import json

from ai_bidding_assistant.core.bootstrap import bootstrap

from .store import JsonlAuditLogStore
from .system import generate_audit_report, log_operation


def main() -> int:
    """
    Minimal runnable entry point for Task 8 skeleton.

    Usage:
      PYTHONPATH=.../src python3 -m ai_bidding_assistant.traceability_system --log-file <path>

    Behavior:
    - Appends one placeholder operation log entry
    - Prints a minimal audit report JSON (placeholder)
    """

    parser = argparse.ArgumentParser(prog="ai_bidding_assistant.traceability_system")
    parser.add_argument(
        "--log-file",
        default="./.aiba/audit_log.jsonl",
        help="Append-only JSONL audit log file path (default: ./.aiba/audit_log.jsonl).",
    )
    args = parser.parse_args()

    bootstrap()
    store = JsonlAuditLogStore(args.log_file)

    _ = log_operation(
        store=store,
        operation={"name": "demo_operation"},
        context={"note": "Task 8 skeleton demo"},
        rationale="TODO(Task 8.1): rationale capture not implemented; demo record",
    )

    report = generate_audit_report(store=store)
    print(json.dumps(dict(report), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())


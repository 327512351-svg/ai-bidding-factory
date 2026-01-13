from __future__ import annotations

import argparse
import json
from typing import Any, Dict

from ai_bidding_assistant.core.bootstrap import bootstrap

from .framework import validate_operation


def main() -> int:
    """
    Minimal runnable entry point for Task 5 (Compliance Framework skeleton).

    Usage:
      PYTHONPATH=.../src python3 -m ai_bidding_assistant.compliance_framework

    Output:
      Prints a placeholder ValidationResult JSON to stdout.
    """

    parser = argparse.ArgumentParser(prog="ai_bidding_assistant.compliance_framework")
    parser.add_argument(
        "--operation",
        help="Optional JSON string for Operation (opaque). Defaults to {}.",
        default="{}",
    )
    args = parser.parse_args()

    bootstrap()

    try:
        operation: Dict[str, Any] = json.loads(args.operation)
        if not isinstance(operation, dict):
            operation = {}
    except Exception:
        operation = {}

    result = validate_operation(operation)
    print(json.dumps(dict(result), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())


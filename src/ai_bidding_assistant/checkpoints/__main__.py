from __future__ import annotations

import argparse
import json

from . import (
    run_task4_document_analysis,
    run_task7_content_generation,
    run_task11_core_integration,
    run_task14_final_validation,
    run_task15_system_readiness,
)


def main() -> int:
    """
    Dispatch runner for checkpoint modules.

    Usage examples:
      python -m ai_bidding_assistant.checkpoints --task 11
    """

    parser = argparse.ArgumentParser(prog="ai_bidding_assistant.checkpoints")
    parser.add_argument(
        "--task",
        required=True,
        choices=["4", "7", "11", "14", "15"],
        help="Checkpoint task to run.",
    )
    parser.add_argument("--file", help="Input file (for task 4/7).")
    parser.add_argument("--section", default="demo", help="Section type (for task 7).")
    args = parser.parse_args()

    if args.task == "4":
        if not args.file:
            raise SystemExit("task 4 requires --file")
        result = run_task4_document_analysis(file_path=args.file)
    elif args.task == "7":
        if not args.file:
            raise SystemExit("task 7 requires --file")
        result = run_task7_content_generation(tender_file=args.file, section=args.section)
    elif args.task == "11":
        result = run_task11_core_integration()
    elif args.task == "14":
        result = run_task14_final_validation()
    else:
        result = run_task15_system_readiness()

    print(json.dumps(result if isinstance(result, dict) else result.to_dict(), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())


from __future__ import annotations

import argparse
import json

from ai_bidding_assistant.core.bootstrap import bootstrap

from .interfaces import analyze_tender_document
from .pipeline import ingest_tender_file


def main() -> int:
    """
    Minimal runnable entry point for Task 3.

    Usage:
      python -m ai_bidding_assistant.document_analyzer /path/to/tender.file

    This is intentionally a component-level runner (NOT the main app CLI; see Task 13).
    """

    parser = argparse.ArgumentParser(prog="ai_bidding_assistant.document_analyzer")
    parser.add_argument("file", help="Path to tender document file (binary/text).")
    args = parser.parse_args()

    bootstrap()
    doc = ingest_tender_file(args.file)
    result = analyze_tender_document(doc)

    # `TenderDocument.to_dict()` exists (Task 2). Print JSON for inspection.
    print(json.dumps(result.to_dict(), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())


from __future__ import annotations

import argparse
import json

from ai_bidding_assistant.core.bootstrap import bootstrap
from ai_bidding_assistant.document_analyzer import ingest_tender_file

from .generator import generate_boilerplate_content


def main() -> int:
    """
    Minimal runnable entry point for Task 6 skeleton.

    Usage:
      PYTHONPATH=.../src python3 -m ai_bidding_assistant.content_generator --tender-file <file> --section <section>

    Output:
      Prints Content JSON (placeholder) to stdout.
    """

    parser = argparse.ArgumentParser(prog="ai_bidding_assistant.content_generator")
    parser.add_argument("--tender-file", required=True, help="Path to tender document file.")
    parser.add_argument("--section", required=True, help="Section type (opaque SectionType).")
    args = parser.parse_args()

    bootstrap()

    # Stage A ingestion (Task 3) is used only as a pipeline integration point.
    # No real parsing/extraction is performed here.
    _ = ingest_tender_file(args.tender_file)

    content = generate_boilerplate_content(args.section, template={})
    print(json.dumps(content.to_dict(), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())


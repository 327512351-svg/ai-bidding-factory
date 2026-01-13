from __future__ import annotations

import argparse
import json
import sys
from typing import List

from ai_bidding_assistant.core.bootstrap import bootstrap
from ai_bidding_assistant.core.error_handling import preserve_work_on_error
from ai_bidding_assistant.document_analyzer import analyze_tender_document, ingest_tender_file
from ai_bidding_assistant.models import TenderDocument


def _validate_stage_a_placeholder_output(doc: TenderDocument) -> List[str]:
    """
    Minimal manual validation for Stage A placeholder output.

    IMPORTANT:
    - This is NOT a formal test suite (no pytest, no property tests).
    - It checks only basic structural expectations so humans can do a quick smoke run.
    - Do NOT add business logic here.
    """

    errors: List[str] = []

    if not isinstance(doc.id, str) or doc.id.strip() == "":
        errors.append("TenderDocument.id must be a non-empty string")
    if not isinstance(doc.title, str) or doc.title.strip() == "":
        errors.append("TenderDocument.title must be a non-empty string")

    if not isinstance(doc.sections, list):
        errors.append("TenderDocument.sections must be a list")
    if not isinstance(doc.requirements, list):
        errors.append("TenderDocument.requirements must be a list")
    if not isinstance(doc.evaluationCriteria, list):
        errors.append("TenderDocument.evaluationCriteria must be a list")
    if not isinstance(doc.submissionGuidelines, list):
        errors.append("TenderDocument.submissionGuidelines must be a list")
    if not isinstance(doc.metadata, dict):
        errors.append("TenderDocument.metadata must be a dict (opaque DocumentMetadata)")

    # Stage A placeholder convention (current skeleton):
    if doc.sections != []:
        errors.append("Expected placeholder sections == [] (no parsing implemented yet)")
    if doc.requirements != []:
        errors.append("Expected placeholder requirements == [] (no extraction implemented yet)")
    if doc.evaluationCriteria != []:
        errors.append("Expected placeholder evaluationCriteria == [] (no extraction implemented yet)")
    if doc.submissionGuidelines != []:
        errors.append("Expected placeholder submissionGuidelines == [] (no extraction implemented yet)")

    return errors


def run_checkpoint(*, file_path: str) -> TenderDocument:
    """
    Task 4 manual checkpoint runner:
    - ingest tender file (Task 3)
    - analyze via Document Analyzer interface (Task 3)
    - validate Stage A placeholder structure (Task 4)
    - return TenderDocument for printing/inspection
    """

    with preserve_work_on_error(hint="checkpoint_document_analysis_validation"):
        doc = ingest_tender_file(file_path)
        analyzed = analyze_tender_document(doc)

        errors = _validate_stage_a_placeholder_output(analyzed)
        if errors:
            # Write errors to stderr and fail with non-zero exit code.
            for e in errors:
                print(f"[checkpoint-failed] {e}", file=sys.stderr)
            raise SystemExit(2)

        return analyzed


def main() -> int:
    """
    Usage:
      PYTHONPATH=.../src python3 -m ai_bidding_assistant.checkpoints.document_analysis_validation <file>

    Output:
      Prints TenderDocument JSON (placeholder structure) to stdout.
    """

    parser = argparse.ArgumentParser(
        prog="ai_bidding_assistant.checkpoints.document_analysis_validation"
    )
    parser.add_argument("file", help="Path to tender document file.")
    args = parser.parse_args()

    bootstrap()
    result = run_checkpoint(file_path=args.file)
    print(json.dumps(result.to_dict(), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())


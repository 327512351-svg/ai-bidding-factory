from __future__ import annotations

import argparse
import json
import sys
from typing import List

from ai_bidding_assistant.core.bootstrap import bootstrap
from ai_bidding_assistant.core.constants import REQUIRES_HUMAN_CONFIRMATION_TOKEN
from ai_bidding_assistant.core.error_handling import preserve_work_on_error
from ai_bidding_assistant.content_generator import generate_boilerplate_content
from ai_bidding_assistant.document_analyzer import ingest_tender_file
from ai_bidding_assistant.models import Content


def _validate_task6_placeholder_content(content: Content) -> List[str]:
    """
    Minimal manual validation for Task 6 placeholder output.

    IMPORTANT:
    - This is NOT a formal test suite (no pytest, no property tests).
    - It checks only basic structural expectations for a manual checkpoint run.
    - Do NOT add business logic here.
    """

    errors: List[str] = []

    if not isinstance(content.id, str) or content.id.strip() == "":
        errors.append("Content.id must be a non-empty string")
    if not isinstance(content.type, str) or content.type.strip() == "":
        errors.append("Content.type must be a non-empty string (opaque ContentType)")
    if not isinstance(content.text, str) or content.text.strip() == "":
        errors.append("Content.text must be a non-empty string")

    if REQUIRES_HUMAN_CONFIRMATION_TOKEN not in content.text:
        errors.append("Content.text must include [REQUIRES HUMAN CONFIRMATION] placeholder token")

    if not isinstance(content.sourceReferences, list):
        errors.append("Content.sourceReferences must be a list")
    if not isinstance(content.generationMetadata, dict):
        errors.append("Content.generationMetadata must be a dict (opaque GenerationMetadata)")
    if not isinstance(content.reviewStatus, str) or content.reviewStatus.strip() == "":
        errors.append("Content.reviewStatus must be a non-empty string (opaque ReviewStatus)")
    if not isinstance(content.approvalHistory, list):
        errors.append("Content.approvalHistory must be a list")

    # Fail-closed checkpoint expectation: should require human review by default.
    if content.reviewStatus != "requires_human_review":
        errors.append("Expected reviewStatus == 'requires_human_review' for fail-closed placeholder output")

    return errors


def run_checkpoint(*, tender_file: str, section: str) -> Content:
    """
    Task 7 manual checkpoint runner:
    - Ingest tender file (integration point only; no parsing logic here)
    - Generate placeholder boilerplate content (Task 6)
    - Validate placeholder output structure (Task 7)
    - Return Content for printing/inspection
    """

    with preserve_work_on_error(hint="checkpoint_content_generation_validation"):
        _ = ingest_tender_file(tender_file)
        content = generate_boilerplate_content(section, template={})

        errors = _validate_task6_placeholder_content(content)
        if errors:
            for e in errors:
                print(f"[checkpoint-failed] {e}", file=sys.stderr)
            raise SystemExit(2)

        return content


def main() -> int:
    """
    Usage:
      PYTHONPATH=.../src python3 -m ai_bidding_assistant.checkpoints.content_generation_validation \
        --tender-file <file> --section <section>

    Output:
      Prints Content JSON (placeholder structure) to stdout.
    """

    parser = argparse.ArgumentParser(
        prog="ai_bidding_assistant.checkpoints.content_generation_validation"
    )
    parser.add_argument("--tender-file", required=True, help="Path to tender document file.")
    parser.add_argument("--section", required=True, help="Section type (opaque SectionType).")
    args = parser.parse_args()

    bootstrap()
    result = run_checkpoint(tender_file=args.tender_file, section=args.section)
    print(json.dumps(result.to_dict(), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())


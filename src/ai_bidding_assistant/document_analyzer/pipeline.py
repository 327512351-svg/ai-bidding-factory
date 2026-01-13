from __future__ import annotations

import hashlib
from pathlib import Path
from typing import Any, Dict

from ai_bidding_assistant.core.error_handling import preserve_work_on_error
from ai_bidding_assistant.models import TenderDocument


def ingest_tender_file(file_path: str) -> TenderDocument:
    """
    Ingest a tender document file into a TenderDocument structure.

    Task 3 goal:
    - "read input file -> return structured placeholder result"
    - No PDF/Word parsing is implemented here (stdlib-only).
    - Downstream steps (Task 3.1+) will replace placeholders with real extraction.
    """

    with preserve_work_on_error(hint="ingest_tender_file"):
        p = Path(file_path)
        data = p.read_bytes()  # may raise (FileNotFoundError, PermissionError, etc.)

        digest = hashlib.sha256(data).hexdigest()
        # IMPORTANT: DocumentMetadata structure is not defined by the spec.
        # To avoid inventing metadata keys/fields, we keep it empty at this stage.
        metadata: Dict[str, Any] = {}

        # Placeholder: no section/requirement extraction performed in Task 3 skeleton.
        return TenderDocument(
            id=digest,
            title=p.stem,
            sections=[],
            requirements=[],
            evaluationCriteria=[],
            submissionGuidelines=[],
            metadata=metadata,
        )


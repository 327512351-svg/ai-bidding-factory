from __future__ import annotations

import hashlib
from typing import Optional

from ai_bidding_assistant.core.constants import REQUIRES_HUMAN_CONFIRMATION_TOKEN


def placeholder_text(*, reason: Optional[str] = None) -> str:
    """
    Task 6.5 skeleton: missing information placeholder insertion.

    We do NOT attempt to detect missing info here (no business logic).
    Instead, we return the required token; optionally include a short reason suffix
    for operators. The suffix is still a placeholder and must not look like final bid text.
    """

    if reason:
        return f"{REQUIRES_HUMAN_CONFIRMATION_TOKEN} ({reason})"
    return REQUIRES_HUMAN_CONFIRMATION_TOKEN


def deterministic_content_id(*, seed: str) -> str:
    """
    Helper to create stable placeholder IDs without external dependencies.
    """

    return hashlib.sha256(seed.encode("utf-8")).hexdigest()


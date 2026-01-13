from __future__ import annotations

from contextlib import contextmanager
import logging
from typing import Iterator, Optional

from .exceptions import WorkPreservationError


@contextmanager
def preserve_work_on_error(*, hint: Optional[str] = None) -> Iterator[None]:
    """
    Error handling framework placeholder (Task 1).

    Requirement 8.1 expects work-in-progress preservation on errors.
    This context manager is a minimal hook that later tasks can extend with real
    checkpointing/backup behavior.

    Current behavior:
    - Logs the error context
    - Re-raises the original exception

    TODO(Task 12): implement actual preservation and recovery procedures.
    """

    try:
        yield
    except Exception as exc:
        logging.getLogger("ai_bidding_assistant").exception(
            "Unhandled error; work preservation hook executed",
            extra={"fields": {"hint": hint}},
        )

        # Placeholder for future: if preservation fails, raise WorkPreservationError.
        _preservation_failed = False
        if _preservation_failed:
            raise WorkPreservationError("Failed to preserve work-in-progress") from exc

        raise


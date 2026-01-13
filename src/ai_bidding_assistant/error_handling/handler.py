from __future__ import annotations

from typing import Any, Dict, List, Optional

from .preserve import preserve_state
from .types import ErrorCategory, ErrorCode, ErrorReport, now_iso


def _categorize(exc: BaseException) -> (str, str, bool):
    """
    Returns (category, code, recoverable)
    """

    if isinstance(exc, FileNotFoundError):
        return (ErrorCategory.IO, ErrorCode.FILE_NOT_FOUND, True)
    if isinstance(exc, PermissionError):
        return (ErrorCategory.IO, ErrorCode.PERMISSION_DENIED, False)
    return (ErrorCategory.INTERNAL, ErrorCode.UNKNOWN, False)


def handle_exception(
    *,
    exc: BaseException,
    steps_completed: Optional[List[Dict[str, Any]]] = None,
    context: Optional[Dict[str, Any]] = None,
    preserve_path: str = "./.aiba/work_state.json",
) -> ErrorReport:
    """
    Map an exception to a unified ErrorReport and persist minimal state.

    Fail-closed: requiresHumanConfirmation defaults to True.
    """

    steps_completed = steps_completed or [{"task": 0, "status": "STARTED"}]
    category, code, recoverable = _categorize(exc)

    next_action: Optional[str] = None
    if category == ErrorCategory.IO and code == ErrorCode.FILE_NOT_FOUND:
        next_action = "Check --tender-file path and re-run."

    preserved_path: Optional[str] = None
    try:
        state = {
            "context": context or {},
            "stepsCompleted": steps_completed,
            "error": {"type": exc.__class__.__name__, "message": str(exc)},
        }
        preserved_path = preserve_state(state, preserve_path)
    except Exception:
        preserved_path = None

    report = ErrorReport(
        status="ERROR",
        category=category,
        code=code,
        message=str(exc),
        requiresHumanConfirmation=True,
        recoverable=recoverable,
        stepsCompleted=steps_completed,
        preservedStatePath=preserved_path,
        timestamp=now_iso(),
        nextAction=next_action,
        notes="Fail-closed placeholder; automated recovery not implemented (Task 12.3+).",
    )
    return report


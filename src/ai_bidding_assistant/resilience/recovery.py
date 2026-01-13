from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Callable, Optional, Tuple

from .types import RecoveryResult


def retry_once(func: Callable[[], Any]) -> Tuple[bool, Optional[Any], Optional[BaseException]]:
    """
    Lightweight retry (max 1 retry) for transient-ish errors.
    Returns (success, result, exception)
    """
    try:
        return True, func(), None
    except Exception as exc:  # noqa: BLE001
        try:
            return True, func(), None
        except Exception as exc2:  # noqa: BLE001
            return False, None, exc2


def recover_from_path(path: str) -> RecoveryResult:
    p = Path(path)
    if not p.exists():
        return RecoveryResult(
            status="FAIL",
            requiresHumanConfirmation=True,
            recoveredFrom=str(p),
            message="Recovery file not found",
            nextAction="Verify recovery path or rerun pipeline manually.",
        )
    try:
        data = json.loads(p.read_text(encoding="utf-8"))
        return RecoveryResult(
            status="PASS",
            requiresHumanConfirmation=True,
            recoveredFrom=str(p),
            message="Recovery point loaded (manual review required; no auto-resume implemented).",
            nextAction="Inspect recovered state and rerun appropriate task manually.",
        )
    except Exception as exc:  # noqa: BLE001
        return RecoveryResult(
            status="FAIL",
            requiresHumanConfirmation=True,
            recoveredFrom=str(p),
            message=f"Failed to read recovery file: {exc}",
            nextAction="Inspect recovery file integrity.",
        )


def recover_from_latest(base_dir: str = "./.aiba") -> RecoveryResult:
    p = Path(base_dir) / "work_state_latest.json"
    return recover_from_path(str(p))


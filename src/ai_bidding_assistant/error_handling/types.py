from __future__ import annotations

from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional


class ErrorCategory:
    CONFIG = "CONFIG"
    IO = "IO"
    PARSE = "PARSE"
    VALIDATION = "VALIDATION"
    COMPLIANCE = "COMPLIANCE"
    INTEGRATION = "INTEGRATION"
    INTERNAL = "INTERNAL"


class ErrorCode:
    FILE_NOT_FOUND = "FILE_NOT_FOUND"
    PERMISSION_DENIED = "PERMISSION_DENIED"
    UNKNOWN = "UNKNOWN"


@dataclass
class ErrorReport:
    status: str  # "ERROR"
    category: str
    code: str
    message: str
    requiresHumanConfirmation: bool
    recoverable: bool
    stepsCompleted: List[Dict[str, Any]]
    preservedStatePath: Optional[str]
    timestamp: str
    nextAction: Optional[str] = None
    notes: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {k: v for k, v in asdict(self).items() if v is not None}


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


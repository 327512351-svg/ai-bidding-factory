from __future__ import annotations

from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from typing import Any, Dict, Optional


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


@dataclass
class AlertRecord:
    severity: str
    message: str
    timestamp: str
    requiresHumanConfirmation: bool
    recoveryProcedure: str
    escalation: str
    source: Optional[Dict[str, Any]] = None

    def to_dict(self) -> Dict[str, Any]:
        return {k: v for k, v in asdict(self).items() if v is not None}


@dataclass
class AlertResult:
    status: str  # PASS/FAIL
    requiresHumanConfirmation: bool
    alert: Optional[Dict[str, Any]] = None
    message: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {k: v for k, v in asdict(self).items() if v is not None}


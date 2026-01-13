from __future__ import annotations

from dataclasses import dataclass, asdict
from typing import Any, Dict, Optional


@dataclass
class BackupResult:
    status: str  # PASS/FAIL
    requiresHumanConfirmation: bool
    source: str
    destination: str
    message: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {k: v for k, v in asdict(self).items() if v is not None}


@dataclass
class RestoreResult:
    status: str  # PASS/FAIL
    requiresHumanConfirmation: bool
    source: str
    restoredTo: str
    message: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {k: v for k, v in asdict(self).items() if v is not None}


@dataclass
class RecoveryResult:
    status: str  # PASS/FAIL
    requiresHumanConfirmation: bool
    recoveredFrom: Optional[str]
    nextAction: Optional[str] = None
    message: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {k: v for k, v in asdict(self).items() if v is not None}


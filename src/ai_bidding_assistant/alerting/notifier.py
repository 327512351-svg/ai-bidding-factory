from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict

from .types import AlertRecord, AlertResult, now_iso


def build_alert(
    *,
    message: str,
    severity: str = "critical",
    source: Dict[str, Any] | None = None,
    recovery_procedure: str | None = None,
    escalation: str | None = None,
) -> AlertRecord:
    return AlertRecord(
        severity=severity,
        message=message,
        timestamp=now_iso(),
        requiresHumanConfirmation=True,
        recoveryProcedure=recovery_procedure
        or "Review error report and follow manual recovery procedures (Task 12.3).",
        escalation=escalation or "Not escalated (placeholder)",
        source=source,
    )


def send_alert(
    alert: AlertRecord,
    *,
    path: str = "./.aiba/alerts.jsonl",
) -> AlertResult:
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    try:
        with p.open("a", encoding="utf-8") as f:
            f.write(json.dumps(alert.to_dict(), ensure_ascii=False) + "\n")
        return AlertResult(
            status="PASS",
            requiresHumanConfirmation=True,
            alert=alert.to_dict(),
            message="Alert recorded (placeholder, no outbound delivery).",
        )
    except Exception as exc:  # noqa: BLE001
        return AlertResult(
            status="FAIL",
            requiresHumanConfirmation=True,
            message=f"Failed to record alert: {exc}",
        )


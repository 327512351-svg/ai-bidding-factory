"""
Task 12.5: Administrator alerting system (skeleton).

Stdlib-only, fail-closed:
- Build alert records with severity, message, recovery hints.
- Persist to .aiba/alerts.jsonl (append-only).
- Optional CLI for manual smoke.
"""

from .types import AlertRecord, AlertResult
from .notifier import build_alert, send_alert

__all__ = [
    "AlertRecord",
    "AlertResult",
    "build_alert",
    "send_alert",
]


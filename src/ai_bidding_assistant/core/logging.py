from __future__ import annotations

import json
import logging
import sys
from datetime import datetime, timezone
from typing import Any, Dict, Mapping, Optional


class _JsonFormatter(logging.Formatter):
    """
    Minimal JSON formatter for structured logs (stdlib-only).

    Task 1: "Configure logging framework with audit trail capabilities".
    We implement a structured formatter that can carry audit fields.
    """

    def format(self, record: logging.LogRecord) -> str:
        payload: Dict[str, Any] = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }

        # Attach exception info when present
        if record.exc_info:
            payload["exc_info"] = self.formatException(record.exc_info)

        # Allow passing structured fields via `extra={"fields": {...}}`
        fields = getattr(record, "fields", None)
        if isinstance(fields, Mapping):
            payload["fields"] = dict(fields)

        return json.dumps(payload, ensure_ascii=False)


def configure_logging(
    *,
    level: str = "INFO",
    app_logger_name: str = "ai_bidding_assistant",
    audit_logger_name: str = "ai_bidding_assistant.audit",
) -> None:
    """
    Configure application + audit loggers.

    Notes:
    - Uses stdout for portability.
    - Audit logger is a normal logger with a distinct name so it can be routed
      differently in deployment if needed.
    - We intentionally do NOT attempt to provide immutability/crypto integrity here
      (mentioned in design doc) — that belongs to later tasks (Traceability System).
    """

    root = logging.getLogger()
    root.setLevel(level)

    # Reset handlers to avoid duplicate logs if configure_logging is called twice.
    root.handlers = []

    handler = logging.StreamHandler(stream=sys.stdout)
    handler.setLevel(level)
    handler.setFormatter(_JsonFormatter())
    root.addHandler(handler)

    # Ensure both loggers exist and inherit root handler.
    logging.getLogger(app_logger_name).setLevel(level)
    logging.getLogger(audit_logger_name).setLevel(level)


def get_logger(name: Optional[str] = None) -> logging.Logger:
    """Get a logger. Defaults to the main app logger name."""
    return logging.getLogger(name or "ai_bidding_assistant")


def audit_log(
    event: str,
    *,
    logger_name: str = "ai_bidding_assistant.audit",
    fields: Optional[Mapping[str, Any]] = None,
) -> None:
    """
    Emit an audit-style log event.

    Task 1 scope:
    - Provide a consistent entry point for audit trail logging.

    TODO(Task 2.5): replace `fields` structure with a dedicated AuditLogEntry model
    once data models are introduced by later tasks.
    """

    logger = logging.getLogger(logger_name)
    extra: Dict[str, Any] = {"fields": {"event": event}}
    if fields:
        extra["fields"].update(dict(fields))

    logger.info(event, extra=extra)


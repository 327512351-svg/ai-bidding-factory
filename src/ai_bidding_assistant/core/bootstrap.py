from __future__ import annotations

from typing import Optional

from .config import AppConfig
from .logging import configure_logging


def bootstrap(*, config: Optional[AppConfig] = None) -> AppConfig:
    """
    Minimal initialization entry point (Task 1).

    - Loads configuration (env-only for now)
    - Configures logging (including audit logger name)

    NOTE: This is NOT the main application interface (see Task 13).
    """

    cfg = config or AppConfig.from_env()
    configure_logging(
        level=cfg.log_level,
        app_logger_name=cfg.app_log_name,
        audit_logger_name=cfg.audit_log_name,
    )
    return cfg


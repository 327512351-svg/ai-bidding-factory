from __future__ import annotations

from dataclasses import dataclass
import os
from typing import Optional


@dataclass(frozen=True)
class AppConfig:
    """
    Base configuration management (Task 1).

    This is intentionally minimal and stdlib-only:
    - Loads settings from environment variables
    - Provides a single place for default values

    TODO(Task 1): expand configuration sources if required by later tasks,
    while keeping "Zero External Dependencies" (design principle) unless the spec
    explicitly changes that.
    """

    env: str = "development"
    log_level: str = "INFO"
    audit_log_name: str = "ai_bidding_assistant.audit"
    app_log_name: str = "ai_bidding_assistant"

    @classmethod
    def from_env(cls, *, prefix: str = "AIBA_") -> "AppConfig":
        """
        Load configuration from environment variables.

        Supported variables:
        - {prefix}ENV
        - {prefix}LOG_LEVEL
        - {prefix}AUDIT_LOG_NAME
        - {prefix}APP_LOG_NAME
        """

        def _get(name: str) -> Optional[str]:
            value = os.getenv(f"{prefix}{name}")
            return value if value is not None and value.strip() != "" else None

        return cls(
            env=_get("ENV") or cls.env,
            log_level=(_get("LOG_LEVEL") or cls.log_level).upper(),
            audit_log_name=_get("AUDIT_LOG_NAME") or cls.audit_log_name,
            app_log_name=_get("APP_LOG_NAME") or cls.app_log_name,
        )


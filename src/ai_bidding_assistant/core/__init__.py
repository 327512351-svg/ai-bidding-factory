"""
Core infrastructure (Task 1):
- configuration
- logging (including audit-style structured logging capability)
- exceptions / error handling primitives
"""

from .config import AppConfig
from .exceptions import BiddingAssistantError
from .logging import configure_logging, get_logger

__all__ = [
    "AppConfig",
    "BiddingAssistantError",
    "configure_logging",
    "get_logger",
]


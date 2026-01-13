"""
Task 12.1: Comprehensive error handling skeleton.

Provides:
- Error categories/codes
- ErrorReport schema
- Handler to map exceptions to fail-closed reports
- State preservation helper (JSON)
"""

from .types import ErrorCategory, ErrorCode, ErrorReport
from .handler import handle_exception
from .preserve import preserve_state

__all__ = ["ErrorCategory", "ErrorCode", "ErrorReport", "handle_exception", "preserve_state"]


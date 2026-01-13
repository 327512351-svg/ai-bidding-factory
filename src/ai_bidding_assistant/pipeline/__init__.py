"""
Task 10: End-to-End Pipeline Dry Run (STRICT, placeholder-only).

Runs Stage A + Tasks 4–9 sequentially with fail-closed semantics.
No business logic, no model calls, no tests.
"""

from .orchestrator import run_pipeline

__all__ = ["run_pipeline"]


"""
Task 10: Workflow State Management (skeleton).

Scope:
- State persistence (JSON)
- Transition validation (fail-closed placeholder)
- Rollback placeholder
- CLI entry for manual smoke
"""

from .store import load_state, save_state, init_state
from .transitions import can_transition, transition
from .rollback import rollback

__all__ = [
    "init_state",
    "load_state",
    "save_state",
    "can_transition",
    "transition",
    "rollback",
]


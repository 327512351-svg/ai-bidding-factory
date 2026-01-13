"""
Checkpoint runners (Task 4+).

Includes:
- Task 4: Document Analysis Validation (manual smoke)
- Task 7: Content Generation Validation (manual smoke)
- Task 11: Core System Integration (manual integration checkpoint)
- Task 14: Final system validation (placeholder)
- Task 15: Final readiness validation (placeholder)

No automated test suite is introduced here.
"""

from .document_analysis_validation import run_checkpoint as run_task4_document_analysis
from .content_generation_validation import run_checkpoint as run_task7_content_generation
from .core_system_integration import run_checkpoint as run_task11_core_integration
from .final_validation import run_checkpoint as run_task14_final_validation
from .system_readiness_validation import run_checkpoint as run_task15_system_readiness

__all__ = [
    "run_task4_document_analysis",
    "run_task7_content_generation",
    "run_task11_core_integration",
    "run_task14_final_validation",
    "run_task15_system_readiness",
]

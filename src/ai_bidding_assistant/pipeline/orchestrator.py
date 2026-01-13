from __future__ import annotations

import json
from dataclasses import dataclass, asdict
from typing import Any, Dict, List, Optional

from ai_bidding_assistant.core.bootstrap import bootstrap
from ai_bidding_assistant.core.constants import REQUIRES_HUMAN_CONFIRMATION_TOKEN
from ai_bidding_assistant.core.error_handling import preserve_work_on_error
from ai_bidding_assistant.error_handling import handle_exception
from ai_bidding_assistant.checkpoints.document_analysis_validation import run_checkpoint as run_task4
from ai_bidding_assistant.checkpoints.content_generation_validation import (
    run_checkpoint as run_task7,
)
from ai_bidding_assistant.compliance_framework import validate_operation
from ai_bidding_assistant.content_generator import generate_boilerplate_content
from ai_bidding_assistant.traceability_system.store import JsonlAuditLogStore
from ai_bidding_assistant.traceability_system.system import generate_audit_report, log_operation
from ai_bidding_assistant.human_review import capture_review_decision, present_for_review


@dataclass
class StepResult:
    task: int
    status: str
    detail: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {k: v for k, v in asdict(self).items() if v is not None}


def run_pipeline(
    *,
    tender_file: str,
    section: str = "demo",
    audit_log_path: str = "./.aiba/pipeline_audit.jsonl",
) -> Dict[str, Any]:
    """
    End-to-end dry run orchestrator (Task 10).

    Pipeline order:
      4 -> 5 -> 6 -> 7 -> 8 -> 9
    Fail-closed: if any step returns allowed == False, stop immediately.
    """

    bootstrap()
    steps: List[StepResult] = []
    requires_human = False
    final_review_status = "requires_human_review"

    try:
        # Task 8.1 (traceability) integration: write a start record immediately so
        # audit_log_path exists even if we fail-closed early (e.g., Task 5).
        store = JsonlAuditLogStore(audit_log_path)
        _ = log_operation(
            store=store,
            operation={"name": "pipeline.start"},
            context={"tender_file": tender_file, "section": section},
            rationale="Pipeline start (placeholder)",
        )

        # Task 4: Document Analysis Checkpoint
        with preserve_work_on_error(hint="pipeline.task4"):
            _doc = run_task4(file_path=tender_file)
            steps.append(StepResult(task=4, status="PASS"))

        # Task 5: Compliance Checkpoint (validate_operation placeholder)
        with preserve_work_on_error(hint="pipeline.task5"):
            compliance = validate_operation({"name": "pipeline_dry_run"})
            allowed = bool(compliance.get("allowed"))
            if not allowed:
                steps.append(StepResult(task=5, status="REQUIRES_HUMAN_CONFIRMATION"))
                requires_human = True
                return {
                    "pipelineStatus": "HALTED",
                    "requiresHumanConfirmation": True,
                    "finalReviewStatus": final_review_status,
                    "steps": [s.to_dict() for s in steps],
                }
            steps.append(StepResult(task=5, status="PASS"))

        # Task 6: Boilerplate generation (placeholder)
        with preserve_work_on_error(hint="pipeline.task6"):
            content = generate_boilerplate_content(section, template={})
            steps.append(StepResult(task=6, status="PLACEHOLDER"))

        # Task 7: Content generation validation checkpoint
        with preserve_work_on_error(hint="pipeline.task7"):
            _ = run_task7(tender_file=tender_file, section=section)
            steps.append(StepResult(task=7, status="PASS"))

        # Task 8: Traceability logging (append one operation and report)
        with preserve_work_on_error(hint="pipeline.task8"):
            _entry = log_operation(
                store=store,
                operation={"name": "pipeline_task8"},
                context={"note": "Task 8 placeholder from pipeline"},
                rationale="Task 8 placeholder",
            )
            _report = generate_audit_report(store=store)
            steps.append(StepResult(task=8, status=_report.get("status", "PASS")))

        # Task 9: Human review (approve path only, per instruction)
        with preserve_work_on_error(hint="pipeline.task9"):
            session = present_for_review(
                content=content,
                review_type="content",
                reviewer={},
                store=store,
            )
            decided = capture_review_decision(
                session,
                decision="approve",
                reviewer={},
                comment="pipeline auto-approve path (placeholder)",
                store=store,
            )
            final_review_status = decided.status
            steps.append(StepResult(task=9, status=final_review_status.upper()))

        return {
            "pipelineStatus": "COMPLETED",
            "requiresHumanConfirmation": requires_human,
            "finalReviewStatus": final_review_status,
            "steps": [s.to_dict() for s in steps],
        }
    except Exception as exc:  # noqa: BLE001
        # Graceful degradation: generate ErrorReport (12.1), halt pipeline, keep schema.
        report = handle_exception(
            exc=exc,
            steps_completed=[s.to_dict() for s in steps] or [{"task": 0, "status": "STARTED"}],
            context={"tender_file": tender_file, "section": section},
            preserve_path="./.aiba/work_state.json",
        )
        steps.append(StepResult(task=999, status="ERROR", detail=getattr(report, "code", None)))
        return {
            "pipelineStatus": "HALTED",
            "requiresHumanConfirmation": True,
            "finalReviewStatus": final_review_status,
            "steps": [s.to_dict() for s in steps],
        }


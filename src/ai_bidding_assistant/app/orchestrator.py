from __future__ import annotations

import json
from dataclasses import dataclass, asdict
from typing import Any, Dict, List, Optional

from ai_bidding_assistant.core.bootstrap import bootstrap
from ai_bidding_assistant.core.error_handling import preserve_work_on_error
from ai_bidding_assistant.error_handling import handle_exception
from ai_bidding_assistant.checkpoints.document_analysis_validation import run_checkpoint as run_task4
from ai_bidding_assistant.compliance_framework import validate_operation
from ai_bidding_assistant.content_generator import generate_boilerplate_content
from ai_bidding_assistant.checkpoints.content_generation_validation import run_checkpoint as run_task7
from ai_bidding_assistant.traceability_system.store import JsonlAuditLogStore
from ai_bidding_assistant.traceability_system.system import generate_audit_report, log_operation
from ai_bidding_assistant.human_review import present_for_review, capture_review_decision
from ai_bidding_assistant.workflow_state import load_state, save_state, can_transition, transition


@dataclass
class OrchestrationStep:
    task: str
    status: str
    detail: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {k: v for k, v in asdict(self).items() if v is not None}


def run_workflow(
    *,
    tender_file: str,
    section: str = "demo",
    audit_log_path: str = "./.aiba/app_audit.jsonl",
) -> Dict[str, Any]:
    """
    Task 13 skeleton orchestration:
    - Invokes existing placeholder components (Tasks 4–12)
    - Fail-closed: on any uncertainty/exception -> HALTED
    - Does NOT change existing schema of upstream components
    """

    bootstrap()
    steps: List[OrchestrationStep] = []
    final_review_status = "requires_human_review"
    requires_human = False

    try:
        # Task 8.1 (traceability) integration: ensure audit_log_path exists even
        # if we fail-closed early at Task 5.
        store = JsonlAuditLogStore(audit_log_path)
        _ = log_operation(
            store=store,
            operation={"name": "app.start"},
            context={"tender_file": tender_file, "section": section},
            rationale="App start (placeholder)",
        )

        # Task 4: Document Analysis Checkpoint
        with preserve_work_on_error(hint="app.task4"):
            _doc = run_task4(file_path=tender_file)
            steps.append(OrchestrationStep(task="4", status="PASS"))

        # Task 5: Compliance (placeholder, fail-closed)
        with preserve_work_on_error(hint="app.task5"):
            compliance = validate_operation({"name": "app_orchestrator"})
            if not compliance.get("allowed"):
                steps.append(OrchestrationStep(task="5", status="REQUIRES_HUMAN_CONFIRMATION"))
                requires_human = True
                return _halt(steps, final_review_status, requires_human)
            steps.append(OrchestrationStep(task="5", status="PASS"))

        # Task 6: Content (placeholder)
        with preserve_work_on_error(hint="app.task6"):
            content = generate_boilerplate_content(section, template={})
            steps.append(OrchestrationStep(task="6", status="PLACEHOLDER"))

        # Task 7: Validation checkpoint
        with preserve_work_on_error(hint="app.task7"):
            _ = run_task7(tender_file=tender_file, section=section)
            steps.append(OrchestrationStep(task="7", status="PASS"))

        # Task 8: Traceability (append + report)
        with preserve_work_on_error(hint="app.task8"):
            _entry = log_operation(
                store=store,
                operation={"name": "app_task8"},
                context={"note": "Task 13 orchestration placeholder"},
                rationale="Task 8 placeholder",
            )
            _report = generate_audit_report(store=store)
            steps.append(OrchestrationStep(task="8", status=_report.get("status", "PASS")))

        # Task 9: Human review (approve path only)
        with preserve_work_on_error(hint="app.task9"):
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
                comment="app orchestration auto-approve path (placeholder)",
                store=store,
            )
            final_review_status = decided.status
            steps.append(OrchestrationStep(task="9", status=final_review_status.upper()))

        # Task 10: load current workflow state, attempt a placeholder transition (fail-closed)
        with preserve_work_on_error(hint="app.task10"):
            wf_state = load_state()
            decision = can_transition(wf_state, wf_state.currentPhase)
            if not decision.get("allowed"):
                steps.append(OrchestrationStep(task="10", status="HALTED", detail=decision.get("reason")))
            else:
                wf_state = transition(wf_state, wf_state.currentPhase)
                save_state(wf_state)
                steps.append(OrchestrationStep(task="10", status="PASS"))

        # Task 12: already integrated via error handling / resilience at pipeline-level; nothing extra here.
        return {
            "appStatus": "COMPLETED",
            "requiresHumanConfirmation": requires_human,
            "finalReviewStatus": final_review_status,
            "steps": [s.to_dict() for s in steps],
        }

    except Exception as exc:  # noqa: BLE001
        report = handle_exception(
            exc=exc,
            steps_completed=[s.to_dict() for s in steps] or [{"task": 0, "status": "STARTED"}],
            context={"tender_file": tender_file, "section": section, "app": True},
            preserve_path="./.aiba/work_state.json",
        )
        steps.append(OrchestrationStep(task="ERR", status="ERROR", detail=report.code if hasattr(report, "code") else None))
        return {
            "appStatus": "HALTED",
            "requiresHumanConfirmation": True,
            "finalReviewStatus": final_review_status,
            "steps": [s.to_dict() for s in steps],
        }


def _halt(steps: List[OrchestrationStep], final_review_status: str, requires_human: bool) -> Dict[str, Any]:
    return {
        "appStatus": "HALTED",
        "requiresHumanConfirmation": requires_human,
        "finalReviewStatus": final_review_status,
        "steps": [s.to_dict() for s in steps],
    }


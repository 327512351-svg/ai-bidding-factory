from __future__ import annotations

import json
from dataclasses import dataclass, asdict
from typing import Any, Dict, List, Optional

from ai_bidding_assistant.core.error_handling import preserve_work_on_error
from ai_bidding_assistant.traceability_system.store import JsonlAuditLogStore
from ai_bidding_assistant.traceability_system.system import log_operation


@dataclass
class Check:
    name: str
    status: str
    notes: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {k: v for k, v in asdict(self).items() if v is not None}


def _safe_import(module_path: str) -> Optional[Any]:
    try:
        module = __import__(module_path, fromlist=["*"])
        return module
    except Exception:
        return None


def run_checkpoint() -> Dict[str, Any]:
    """
    Task 11: Checkpoint - Core System Integration

    Fail-closed: any missing/uncertain => requiresHumanConfirmation = True, status = FAIL.
    No schema mutations; only diagnostic checks.
    """

    checks: List[Check] = []
    questions: List[str] = []
    all_ok = True

    # Import / availability checks (core modules).
    module_paths = [
        "ai_bidding_assistant.document_analyzer",
        "ai_bidding_assistant.compliance_framework",
        "ai_bidding_assistant.content_generator",
        "ai_bidding_assistant.traceability_system",
        "ai_bidding_assistant.human_review",
        "ai_bidding_assistant.pipeline",
    ]
    for path in module_paths:
        mod = _safe_import(path)
        if mod is None:
            checks.append(Check(name=f"import:{path}", status="FAIL", notes="Import failed"))
            questions.append(f"Module {path} is unavailable; confirm installation?")
            all_ok = False
        else:
            checks.append(Check(name=f"import:{path}", status="PASS"))

    # Interface presence checks (symbols must exist).
    try:
        from ai_bidding_assistant.models import TenderDocument, Content, AuditLogEntry, ReviewSession

        _ = (TenderDocument, Content, AuditLogEntry, ReviewSession)
        checks.append(Check(name="models.core_structs", status="PASS"))
    except Exception:
        checks.append(Check(name="models.core_structs", status="FAIL", notes="Required model classes missing"))
        all_ok = False

    try:
        from ai_bidding_assistant.document_analyzer.interfaces import analyze_tender_document
        from ai_bidding_assistant.compliance_framework import validate_operation
        from ai_bidding_assistant.content_generator import generate_boilerplate_content
        from ai_bidding_assistant.traceability_system import log_operation as ts_log_operation
        from ai_bidding_assistant.human_review import present_for_review, capture_review_decision
        from ai_bidding_assistant.pipeline import run_pipeline

        _ = (
            analyze_tender_document,
            validate_operation,
            generate_boilerplate_content,
            ts_log_operation,
            present_for_review,
            capture_review_decision,
            run_pipeline,
        )
        checks.append(Check(name="interfaces.presence", status="PASS"))
    except Exception:
        checks.append(Check(name="interfaces.presence", status="FAIL", notes="One or more interfaces missing"))
        questions.append("Interface presence failed; verify Task 4-10 modules exported correctly?")
        all_ok = False

    # Optional lightweight smoke: traceability log append (no schema change).
    with preserve_work_on_error(hint="checkpoint.core_system_integration.traceability_smoke"):
        try:
            store = JsonlAuditLogStore("./.aiba/core_integration_audit.jsonl")
            log_operation(
                store=store,
                operation={"name": "core_system_integration_smoke"},
                context={"note": "Task 11 smoke"},
                rationale="Task 11 placeholder",
            )
            checks.append(Check(name="traceability.append_smoke", status="PASS"))
        except Exception as exc:  # noqa: BLE001
            checks.append(
                Check(
                    name="traceability.append_smoke",
                    status="FAIL",
                    notes=f"Append failed: {exc}",
                )
            )
            questions.append("Traceability append failed; check file permissions or log_operation behavior?")
            all_ok = False

    status = "PASS" if all_ok else "FAIL"
    requires_human = not all_ok

    return {
        "status": status,
        "requiresHumanConfirmation": requires_human,
        "checks": [c.to_dict() for c in checks],
        "questions": questions,
    }


if __name__ == "__main__":
    print(json.dumps(run_checkpoint(), ensure_ascii=False, indent=2))


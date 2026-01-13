from __future__ import annotations

import hashlib
from datetime import datetime, timezone
from typing import Any, Dict, List, Mapping, Optional

from ai_bidding_assistant.core.constants import REQUIRES_HUMAN_CONFIRMATION_TOKEN
from ai_bidding_assistant.core.error_handling import preserve_work_on_error
from ai_bidding_assistant.core.logging import audit_log
from ai_bidding_assistant.models import Actor, AuditLogEntry, Context, Operation

from .store import JsonlAuditLogStore
from .types import AuditReport, OriginTrace, TraceabilityResult


def _make_entry_id(*, operation: Operation, context: Context) -> str:
    """
    Create a deterministic ID for an audit entry (stdlib-only).
    """

    h = hashlib.sha256()
    h.update(repr(operation).encode("utf-8"))
    h.update(b"|")
    h.update(repr(context).encode("utf-8"))
    h.update(b"|")
    h.update(datetime.now(timezone.utc).isoformat().encode("utf-8"))
    return h.hexdigest()


def _json_safe_entry_dict(entry: AuditLogEntry) -> Dict[str, Any]:
    """
    Convert an AuditLogEntry dict into a JSON-serializable form.

    NOTE:
    - We do NOT change the data model schema.
    - We only convert known non-JSON types (e.g. datetime) into strings.
    """

    d: Dict[str, Any] = dict(entry.to_dict())
    ts = d.get("timestamp")
    if isinstance(ts, datetime):
        d["timestamp"] = ts.isoformat()
    return d


def log_operation(
    *,
    store: JsonlAuditLogStore,
    operation: Operation,
    context: Context,
    actor: Optional[Actor] = None,
    inputs: Optional[List[Any]] = None,
    outputs: Optional[List[Any]] = None,
    rationale: Optional[str] = None,
) -> AuditLogEntry:
    """
    Interface from design.md:
    - logOperation(operation: Operation, context: Context): LogEntry

    Task 8.1 skeleton:
    - Creates an AuditLogEntry (data model from Task 2)
    - Appends a record to an append-only JSONL file (store)
    - Tracks an operation chain in a minimal placeholder form
    """

    with preserve_work_on_error(hint="traceability.log_operation"):
        entry_id = _make_entry_id(operation=operation, context=context)

        # Operation chain tracking (placeholder):
        # We avoid changing AuditLogEntry schema; we store chain metadata in the record wrapper.
        prev = store.last_record()
        prev_id = None
        if isinstance(prev, dict):
            prev_entry = prev.get("entry")
            if isinstance(prev_entry, dict):
                prev_id = prev_entry.get("id")

        entry = AuditLogEntry(
            id=entry_id,
            timestamp=datetime.now(timezone.utc),
            operation=operation,
            actor=actor or {},
            inputs=inputs or [],
            outputs=outputs or [],
            complianceStatus=REQUIRES_HUMAN_CONFIRMATION_TOKEN,
            traceabilityChain=[x for x in [prev_id, entry_id] if isinstance(x, str)],
        )

        record: Dict[str, Any] = {
            "entry": _json_safe_entry_dict(entry),
            # "rationale tracking" requested by Task 8.1: schema not defined in models,
            # so keep it as an opaque wrapper field.
            "rationale": rationale
            or "TODO(Task 8.1): rationale capture not implemented; requires human confirmation",
        }

        store.append(record)
        audit_log("traceability.log_operation", fields={"entry_id": entry.id})
        return entry


def trace_content_origin(*, content_id: str) -> OriginTrace:
    """
    Interface from design.md:
    - traceContentOrigin(content: Content): OriginTrace

    Task 8 scope does not define origin-tracing details; provide a fail-closed placeholder.
    """

    with preserve_work_on_error(hint="traceability.trace_content_origin"):
        _ = content_id
        return {"status": REQUIRES_HUMAN_CONFIRMATION_TOKEN, "note": "TODO(Task 8): origin tracing not implemented"}


def search_audit_trail(
    *,
    store: JsonlAuditLogStore,
    contains_text: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """
    Task 8.3 skeleton: searchable audit trail interface.

    - Simple substring search over JSON-serialized records (stdlib-only).
    - Fail-closed behavior: invalid records are still returned for investigation.
    """

    with preserve_work_on_error(hint="traceability.search_audit_trail"):
        results: List[Dict[str, Any]] = []
        needle = (contains_text or "").strip()
        for rec in store.iter_records():
            if not needle:
                results.append(rec)
                continue
            if needle in repr(rec):
                results.append(rec)
        return results


def validate_audit_storage(*, store: JsonlAuditLogStore) -> TraceabilityResult:
    """
    Task 8.3 skeleton: audit data validation / integrity checking.

    - Checks basic structural expectations.
    - Does NOT provide cryptographic integrity guarantees in this skeleton.
    """

    with preserve_work_on_error(hint="traceability.validate_audit_storage"):
        issues: List[str] = []
        for i, rec in enumerate(store.iter_records()):
            if rec.get("_invalid_json_line") or rec.get("_invalid_record"):
                issues.append(f"record[{i}] is invalid JSON/structure")
                continue
            entry = rec.get("entry")
            if not isinstance(entry, dict):
                issues.append(f"record[{i}] missing 'entry' dict")
                continue
            if not isinstance(entry.get("id"), str) or not entry.get("id"):
                issues.append(f"record[{i}].entry.id missing/invalid")
        status = "PASS" if not issues else "FAIL"
        return {
            "status": status,
            "requiresHumanConfirmation": status != "PASS",
            "reasons": issues,
            "note": "TODO(Task 8.3): stronger integrity checks (hash chain/signatures) not implemented",
        }


def generate_audit_report(*, store: JsonlAuditLogStore) -> AuditReport:
    """
    Interface from design.md:
    - generateAuditReport(timeRange: TimeRange): AuditReport

    Task 8.3 skeleton:
    - No timeRange filtering is implemented (schema not defined).
    - Returns a minimal report: counts + validation result + sample ids.
    """

    with preserve_work_on_error(hint="traceability.generate_audit_report"):
        records = list(store.iter_records())
        validation = validate_audit_storage(store=store)

        sample_ids: List[str] = []
        for rec in records[-5:]:
            entry = rec.get("entry")
            if isinstance(entry, dict) and isinstance(entry.get("id"), str):
                sample_ids.append(entry["id"])

        report: Dict[str, Any] = {
            "status": validation.get("status", "FAIL"),
            "requiresHumanConfirmation": validation.get("requiresHumanConfirmation", True),
            "totalRecords": len(records),
            "sampleEntryIds": sample_ids,
            "validation": dict(validation),
            "note": "TODO(Task 8.3): timeRange filtering and compliance report generation not implemented",
        }

        audit_log("traceability.audit_report_generated", fields={"totalRecords": report["totalRecords"]})
        return report


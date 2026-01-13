from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, Iterable, Iterator, Optional

from ai_bidding_assistant.core.error_handling import preserve_work_on_error


class JsonlAuditLogStore:
    """
    Append-only JSONL store (Task 8.1 skeleton).

    "Immutable" here means:
    - this class only APPENDS new records
    - no mutation/update APIs are provided

    TODO(Task 8.1/8.3): add stronger integrity guarantees (e.g. hash chain, signatures)
    once the spec explicitly requires the exact mechanism.
    """

    def __init__(self, file_path: str) -> None:
        self._path = Path(file_path)
        self._path.parent.mkdir(parents=True, exist_ok=True)

    @property
    def path(self) -> Path:
        return self._path

    def append(self, record: Dict[str, Any]) -> None:
        with preserve_work_on_error(hint="traceability.store.append"):
            line = json.dumps(record, ensure_ascii=False)
            with self._path.open("a", encoding="utf-8") as f:
                f.write(line + "\n")

    def iter_records(self) -> Iterator[Dict[str, Any]]:
        """
        Iterate all records from the JSONL file.
        """

        if not self._path.exists():
            return iter(())

        def _gen() -> Iterator[Dict[str, Any]]:
            with preserve_work_on_error(hint="traceability.store.iter_records"):
                with self._path.open("r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if not line:
                            continue
                        try:
                            obj = json.loads(line)
                        except Exception:
                            # Fail-closed: yield a recognizable error record; validation will catch it.
                            yield {"_invalid_json_line": True, "raw": line}
                            continue
                        if isinstance(obj, dict):
                            yield obj
                        else:
                            yield {"_invalid_record": True, "raw": obj}

        return _gen()

    def last_record(self) -> Optional[Dict[str, Any]]:
        last: Optional[Dict[str, Any]] = None
        for rec in self.iter_records():
            last = rec
        return last


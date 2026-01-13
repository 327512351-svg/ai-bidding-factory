import { appTheme } from "../theme";

interface Check {
  name: string;
  status: "PASS" | "WARN";
  notes?: string;
}

export function ReviewCheckpoint() {
  const checks: Check[] = [
    { name: "队列视图存在（占位数据）", status: "PASS" },
    { name: "筛选/批量操作按钮存在", status: "PASS" },
    { name: "详情面板显示摘要/上下文占位", status: "PASS" },
    {
      name: "审核操作（approve/reject）",
      status: "WARN",
      notes: "仅弹出占位提示，未写入审计/状态变更",
    },
    {
      name: "审计/追溯接入",
      status: "WARN",
      notes: "尚未接 traceability/human review 后端逻辑",
    },
  ];

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1>人工审核检查点（占位）</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 10 checkpoint：核对审核队列/详情/操作组件是否存在，占位行为不做真实决策。
      </p>
      <section
        style={{
          border: `1px solid ${appTheme.colors.border}`,
          borderRadius: "8px",
          padding: "1rem",
          background: appTheme.colors.panel,
          maxWidth: "720px",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {checks.map((check) => (
            <li
              key={check.name}
              style={{
                padding: "0.5rem 0",
                borderBottom: `1px solid ${appTheme.colors.border}`,
              }}
            >
              <strong style={{ color: check.status === "PASS" ? "#34d399" : "#f97316" }}>
                [{check.status}]
              </strong>{" "}
              {check.name}
              {check.notes ? (
                <div style={{ color: appTheme.colors.muted, fontSize: "0.95rem" }}>{check.notes}</div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}


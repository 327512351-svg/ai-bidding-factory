import { appTheme } from "../theme";

interface Check {
  name: string;
  status: "PASS" | "WARN";
  notes?: string;
}

export function IntegrationCheckpoint() {
  const checks: Check[] = [
    { name: "Auth + ProtectedRoute 能力已挂载", status: "PASS" },
    { name: "文档分析/上传/生成页面存在", status: "PASS" },
    { name: "人工审核/内容生成/分析展示已可访问（需 auth）", status: "PASS" },
    {
      name: "审计/Traceability 接口",
      status: "WARN",
      notes: "前端仅展示占位内容，未接入后端 audit/traceability",
    },
    {
      name: "Pipeline/Python CLI 集成",
      status: "WARN",
      notes: "前端页面未调用 CLI，仅提供链接与 status 说明",
    },
  ];

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1>核心功能集成检查点</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 11 checkpoint：确认各占位模块在 UI 层齐套且 fail-closed。如有不确定点需人工确认。
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

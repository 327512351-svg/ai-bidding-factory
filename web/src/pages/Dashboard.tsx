import { appTheme } from "../theme";

const cardStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "8px",
  padding: "1rem",
  background: appTheme.colors.panel,
  flex: "1 1 220px",
  minWidth: "220px",
};

export function Dashboard() {
  const overview = [
    { label: "项目总数", value: "—", notes: "占位，无真实数据" },
    { label: "进行中", value: "—", notes: "占位" },
    { label: "待审核", value: "—", notes: "占位" },
  ];

  const health = [
    { label: "API 状态", value: "未知 (占位)" },
    { label: "实时连接", value: "未连接 (占位)" },
    { label: "合规监控", value: "未开启 (占位)" },
  ];

  const workflow = [
    { phase: "文档分析", status: "占位" },
    { phase: "内容生成", status: "占位" },
    { phase: "合规检查", status: "占位" },
    { phase: "人审", status: "占位" },
  ];

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Dashboard（占位）</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 5 骨架：仅展示静态占位卡片，不含真实数据或业务逻辑。
      </p>

      <section style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        {overview.map((o) => (
          <div key={o.label} style={cardStyle}>
            <h3 style={{ margin: "0 0 0.25rem 0" }}>{o.label}</h3>
            <div style={{ fontSize: "1.4rem", fontWeight: 600 }}>{o.value}</div>
            <div style={{ color: appTheme.colors.muted, fontSize: "0.95rem" }}>{o.notes}</div>
          </div>
        ))}
      </section>

      <section style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>系统健康（占位）</h3>
          <ul style={{ margin: 0, paddingLeft: "1rem", color: appTheme.colors.muted }}>
            {health.map((h) => (
              <li key={h.label}>
                <strong>{h.label}：</strong> {h.value}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ ...cardStyle, flex: "2 1 320px" }}>
          <h3 style={{ marginTop: 0 }}>工作流程进度（占位）</h3>
          <ul style={{ margin: 0, paddingLeft: "1rem", color: appTheme.colors.muted }}>
            {workflow.map((w) => (
              <li key={w.phase}>
                <strong>{w.phase}：</strong> {w.status}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ ...cardStyle, flex: "1 1 100%" }}>
        <h3 style={{ marginTop: 0 }}>项目列表（占位）</h3>
        <p style={{ color: appTheme.colors.muted, marginBottom: "0.5rem" }}>
          这里本应展示项目列表、筛选和分页。当前无真实数据。
        </p>
        <div
          style={{
            border: `1px dashed ${appTheme.colors.border}`,
            borderRadius: "8px",
            padding: "0.75rem",
            color: appTheme.colors.muted,
          }}
        >
          无项目数据（占位）
        </div>
      </section>
    </main>
  );
}


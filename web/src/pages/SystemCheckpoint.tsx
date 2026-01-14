import { appTheme } from "../theme";

type CheckStatus = "PASS" | "WARN" | "FAIL";

type CheckItem = {
  id: string;
  name: string;
  status: CheckStatus;
  description: string;
  notes: string;
};

const checks: CheckItem[] = [
  {
    id: "routes",
    name: "关键路由可达",
    status: "PASS",
    description: "Home/Reports/Config/Monitoring/Users/Notifications/Workflow 等均已注册。",
    notes: "实际可访问需在浏览器确认当前 Vite 实例使用最新 bundle。",
  },
  {
    id: "exports",
    name: "导出按钮可用",
    status: "PASS",
    description: "Audit/Workflow/Compliance/Reports 页面提供 JSON 导出（占位）。",
    notes: "导出文件由浏览器 Blob 实现；无后端服务依赖。",
  },
  {
    id: "notifications",
    name: "通知通道占位",
    status: "WARN",
    description: "通知 slice 和 mock WebSocket 可推送占位通知。",
    notes: "需后续接真实 WS/API；目前保持 fail-closed（requires human review）。",
  },
  {
    id: "workflow",
    name: "工作流程/配置占位",
    status: "PASS",
    description: "配置页只读、流程页面占位，按钮均 disabled。",
    notes: "任何修改需后端/权限，当前 UI 仅展示状态。",
  },
  {
    id: "audit",
    name: "审计/监控展示",
    status: "WARN",
    description: "监控页聚合审计/合规/流程/通知示意数据。",
    notes: "数据目前静态样例，真实审计需 Task 12 的追溯系统补齐。",
  },
];

const cardStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "8px",
  padding: "1rem",
  background: appTheme.colors.panel,
  marginBottom: "1rem",
};

const badgeColors: Record<CheckStatus, string> = {
  PASS: "#16a34a",
  WARN: "#f59e0b",
  FAIL: "#ef4444",
};

export function SystemCheckpoint() {
  return (
    <main style={{ padding: "1.5rem", maxWidth: "1080px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>系统集成检查点（占位）</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 18 骨架：列出关键子系统检查结果，默认 fail-closed 逻辑，需人工确认后续修复。
      </p>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>检查列表</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {checks.map((check) => (
            <div
              key={check.id}
              style={{
                border: `1px dashed ${appTheme.colors.border}`,
                borderRadius: "8px",
                padding: "0.75rem",
                background: "#0b1220",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ margin: 0 }}>{check.name}</h4>
                <span
                  style={{
                    padding: "0.2rem 0.6rem",
                    borderRadius: "6px",
                    background: badgeColors[check.status],
                    color: "#0b1220",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  {check.status}
                </span>
              </div>
              <p style={{ ...cardBaseMuted, margin: "0.35rem 0" }}>{check.description}</p>
              <p style={{ ...cardBaseMuted, fontSize: "0.85rem" }}>{check.notes}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>操作与验证提示</h3>
        <ul style={{ listStyle: "disc", paddingLeft: "1.2rem", color: appTheme.colors.muted }}>
          <li>确保只有一个 Vite 实例在跑，避免旧 bundle 缓存路由。</li>
          <li>每次更新后在浏览器按 Cmd+Shift+R 强刷或附加 ?t=1。</li>
          <li>状态为 WARN/FAIL 时需要人工确认（fail-closed），不要继续自动推进。</li>
        </ul>
      </section>
    </main>
  );
}

const cardBaseMuted: React.CSSProperties = {
  color: appTheme.colors.muted,
};

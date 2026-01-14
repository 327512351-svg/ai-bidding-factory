import { appTheme } from "../theme";

type CheckItem = {
  id: string;
  name: string;
  status: "PASS" | "WARN";
  notes: string;
};

const checks: CheckItem[] = [
  { id: "routes", name: "核心路由已注册", status: "PASS", notes: "所有受保护页（monitoring/users/help/debug/system checkpoint 等）均已配置" },
  { id: "error", name: "错误边界就绪", status: "PASS", notes: "Debug Crash 可验证 ErrorBoundary，出现降级提示" },
  { id: "loading", name: "加载占位就绪", status: "PASS", notes: "Debug Skeleton 展示骨架提示；主要页面可按需演示" },
  { id: "help", name: "引导/自检入口", status: "PASS", notes: "Home 置顶入口含帮助、骨架、错误验证；系统检查点页可用" },
  { id: "data", name: "数据与后端", status: "WARN", notes: "全部为占位/静态样例，未接后端 API；需人工确认再上线" },
  { id: "tests", name: "自动化测试", status: "WARN", notes: "Task 20 属性/端到端/可访问性测试尚未接入" },
];

const cardStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "10px",
  padding: "1rem",
  background: appTheme.colors.panel,
  marginBottom: "1rem",
};

const muted = { color: appTheme.colors.muted, fontSize: "0.9rem" };

const badgeColors = {
  PASS: "#16a34a",
  WARN: "#f59e0b",
} as const;

export function FinalReadiness() {
  return (
    <main style={{ padding: "1.5rem", maxWidth: "1080px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>系统就绪验证（占位）</h1>
      <p style={{ ...muted, marginBottom: "1rem" }}>
        Task 21 骨架：列出最终上线前需人工确认的项。未接后端与自动化测试，保持 fail-closed。
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
                <strong>{check.name}</strong>
                <span
                  style={{
                    padding: "0.2rem 0.6rem",
                    borderRadius: "6px",
                    background: badgeColors[check.status],
                    color: "#0b1220",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                  }}
                >
                  {check.status}
                </span>
              </div>
              <p style={{ ...muted, margin: "0.35rem 0 0 0" }}>{check.notes}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>上线前人工确认（占位）</h3>
        <ul style={{ margin: 0, paddingLeft: "1.2rem", color: appTheme.colors.muted }}>
          <li>仅单实例 Vite，避免旧 bundle；演示前强刷 Home。</li>
          <li>验证 Debug Crash/Skeleton/Help 与 System Checkpoint 均可访问。</li>
          <li>后端 API 未接入，任何发布需人工二次确认与安全审查。</li>
          <li>测试套件（属性/E2E/可访问性）尚未实现，需评估后补齐。</li>
        </ul>
      </section>
    </main>
  );
}


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
  { id: "test20_1", name: "Task 20.1 属性测试（fast-check）", status: "PASS", notes: "已接入 vitest+fast-check；23 个属性，每项≥100次迭代" },
  { id: "test20_2", name: "Task 20.2 端到端验证（Playwright）", status: "PASS", notes: "Chromium/Firefox/WebKit 覆盖未登录拦截、演示登录、关键页面、debug crash" },
  { id: "test20_3", name: "Task 20.3 可访问性/性能/移动端", status: "PASS", notes: "axe-core 扫描（A/AA，serious/critical 阻断）+ 性能基线 + 移动端视口无横向溢出" },
  { id: "data", name: "数据与后端", status: "WARN", notes: "全部为占位/静态样例，未接后端 API；需人工确认再上线" },
  { id: "security", name: "发布安全与权限", status: "WARN", notes: "当前仅前端占位 RBAC/认证；上线前需后端鉴权、审计、最小权限与安全评审" },
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
        Task 21：最终检查点。当前为占位系统，默认 fail-closed；测试可重复运行，发布仍需人工确认与安全审查。
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
        <h3 style={{ marginTop: 0 }}>自动化测试执行指引（可复制）</h3>
        <p style={muted}>
          说明：本项目存在 Vite transform/多实例缓存问题，因此 Playwright 默认使用独立端口 <strong>5174</strong> 启动专用 dev server，
          避免与开发中的 5173 冲突并确保测试拿到最新 bundle。
        </p>
        <pre
          style={{
            background: "#0b1220",
            border: `1px solid ${appTheme.colors.border}`,
            borderRadius: "8px",
            padding: "0.75rem",
            overflowX: "auto",
            color: "#e5e7eb",
            fontSize: "0.9rem",
          }}
        >{`cd web

# Task 20.1：属性测试（23项，≥100次迭代）
npm test

# Task 20.2 + 20.3：E2E（含 a11y/perf/mobile）
npm run test:e2e`}</pre>
        <p style={{ ...muted, marginTop: "0.5rem" }}>
          若需指定端口/host：可设置环境变量 <code>E2E_PORT</code>/<code>E2E_HOST</code>（占位说明）。
        </p>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>上线前人工确认（占位）</h3>
        <ul style={{ margin: 0, paddingLeft: "1.2rem", color: appTheme.colors.muted }}>
          <li>仅单实例 Vite，避免旧 bundle；演示前强刷 Home。</li>
          <li>验证 Debug Crash/Skeleton/Help 与 System Checkpoint 均可访问。</li>
          <li>后端 API 未接入，任何发布需人工二次确认与安全审查。</li>
          <li>自动化测试已接入，但仍需人工评估“占位逻辑”与真实业务/合规要求的差距。</li>
        </ul>
      </section>
    </main>
  );
}


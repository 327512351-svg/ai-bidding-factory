import { appTheme } from "../theme";

const cardStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "10px",
  padding: "1rem",
  background: appTheme.colors.panel,
  marginBottom: "1rem",
};

const muted = { color: appTheme.colors.muted, fontSize: "0.9rem" };

const steps = [
  {
    title: "1. 进入主控台",
    description: "使用受保护路由探索首页、Dashboard、文档与分析部分，确认当前状态。",
  },
  {
    title: "2. 验证数据连通",
    description: "先跑 Task 16/17 的导出、配置、监控页面，确认 JSON 导出与通知 mock 正常。",
  },
  {
    title: "3. 运行检查点",
    description: "执行 Task 18 自检，确保关键路由可访问，警告项标记需人工确认。",
  },
];

const faq = [
  {
    q: "为何页面有占位提示？",
    a: "所有页面当前都采用 fail-closed 占位输出，不连接实际后端，需人工审查后再接真实数据。",
  },
  {
    q: "如何处理 WARN/FAIL?",
    a: "按照 Task 18 指示，遇到 WARN/FAIL 要先人工确认流程再继续，避免自动走下一步。",
  },
];

const tips = ["保持 Vite 仅有一个实例，避免 transform 缓存", "强刷首页 + 报告/配置/监控确保路由更新", "尽量在文件顶部加提示说明“占位/需后端”"];

export function Help() {
  return (
    <main style={{ padding: "1.5rem", maxWidth: "1080px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>用户引导与帮助（占位）</h1>
      <p style={{ ...muted, marginBottom: "1rem" }}>
        Task 19.3 骨架：提供新用户引导、操作步骤、常见问题及快捷提示，均为占位内容。
      </p>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>演示流程</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {steps.map((step) => (
            <div key={step.title} style={{ padding: "0.5rem", borderBottom: `1px dotted ${appTheme.colors.border}` }}>
              <strong>{step.title}</strong>
              <p style={{ ...muted, margin: "0.25rem 0 0 0" }}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>常见问题（FAQ）</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faq.map((item) => (
            <div key={item.q}>
              <strong>{item.q}</strong>
              <p style={{ ...muted, margin: "0.25rem 0 0 0" }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>快速提示</h3>
        <ul style={{ margin: 0, paddingLeft: "1.2rem", color: appTheme.colors.muted }}>
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
        <p style={{ ...muted, marginTop: "0.75rem" }}>每次演示前请确认以上提示，确保页面保持最新状态。</p>
      </section>
    </main>
  );
}

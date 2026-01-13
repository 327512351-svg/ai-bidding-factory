import { appTheme } from "../theme";

interface Check {
  name: string;
  status: "PASS" | "WARN";
  notes?: string;
}

export function AuthCheckpoint() {
  const checks: Check[] = [
    { name: "路由可用(/, /login, /protected)", status: "PASS" },
    { name: "Auth 状态管理存在(auth slice)", status: "PASS" },
    { name: "受保护路由拦截 (status !== authenticated)", status: "PASS" },
    {
      name: "真实认证/令牌管理",
      status: "WARN",
      notes: "未实现，提交登录后仅置为 requires_human_review（占位）",
    },
    {
      name: "RBAC/受保护路由策略",
      status: "WARN",
      notes: "仅检测 authenticated 字符串，无角色校验（占位）",
    },
  ];

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1>认证与基础架构检查点（占位）</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 4 checkpoint：仅做手工可视化自检，不执行真实测试或后端调用。
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
          {checks.map((c) => (
            <li
              key={c.name}
              style={{
                padding: "0.5rem 0",
                borderBottom: `1px solid ${appTheme.colors.border}`,
              }}
            >
              <strong style={{ color: c.status === "PASS" ? "#34d399" : "#fbbf24" }}>
                [{c.status}]
              </strong>{" "}
              {c.name}
              {c.notes ? (
                <div style={{ color: appTheme.colors.muted, fontSize: "0.95rem" }}>{c.notes}</div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}


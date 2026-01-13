import { appTheme } from "../theme";

export function ProtectedDemo() {
  return (
    <main style={{ padding: "1.5rem" }}>
      <h1>受保护页面（占位）</h1>
      <p style={{ color: appTheme.colors.muted }}>
        Task 3.3 占位：仅在 status === "authenticated" 时可访问，其余状态会被拦截并提示人工确认/登录。
      </p>
      <section
        style={{
          border: `1px solid ${appTheme.colors.border}`,
          borderRadius: "8px",
          padding: "1rem",
          background: appTheme.colors.panel,
          maxWidth: "640px",
        }}
      >
        <p>这里本应展示受保护的数据或操作（占位）。</p>
      </section>
    </main>
  );
}


import { Link } from "react-router-dom";
import { PageSkeleton } from "../components/PageSkeleton";
import { appTheme } from "../theme";

export function DebugSkeleton() {
  return (
    <main style={{ padding: "1.5rem", maxWidth: "960px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>加载骨架演示（占位）</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 19.2 骨架演示：路由使用 lazy+Suspense 时，加载中显示 PageSkeleton。
      </p>

      <section style={{ marginBottom: "1rem" }}>
        <PageSkeleton title="示例骨架（本页固定展示）" />
      </section>

      <section
        style={{
          border: `1px solid ${appTheme.colors.border}`,
          borderRadius: "10px",
          padding: "1rem",
          background: appTheme.colors.panel,
        }}
      >
        <h3 style={{ marginTop: 0 }}>如何验证“路由级骨架”</h3>
        <ol style={{ color: appTheme.colors.muted, paddingLeft: "1.2rem" }}>
          <li>打开浏览器 DevTools → Network，勾选 Disable cache，并把 Throttling 设为 Slow 3G。</li>
          <li>点击下面任意链接进入懒加载页面，观察是否出现骨架提示。</li>
          <li>若没看到，尝试 Cmd+Shift+R 强刷。</li>
        </ol>
        <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            <Link to="/reports">报告生成（懒加载）</Link>
          </li>
          <li>
            <Link to="/users">用户管理（懒加载）</Link>
          </li>
          <li>
            <Link to="/monitoring">系统监控（懒加载）</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}


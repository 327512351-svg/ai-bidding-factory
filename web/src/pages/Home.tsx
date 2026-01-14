import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { appTheme } from "../theme";
import { RootState } from "../state/types";
import { AuthState } from "../state/slices/authSlice";

export function Home() {
  const auth = useSelector<RootState, AuthState | undefined>((state: any) => state.auth);
  const status = auth?.status ?? "unauthenticated";
  const user = auth?.user ?? "未登录";

  return (
    <main style={{ padding: "1.5rem", maxWidth: "960px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>AI 投标助手 Web</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 1 骨架：项目结构、路由、主题占位。无真实业务逻辑。
      </p>
      <section
        style={{
          border: `1px solid ${appTheme.colors.border}`,
          borderRadius: "8px",
          padding: "1rem",
          background: appTheme.colors.panel,
          maxWidth: "720px",
          marginBottom: "1rem",
        }}
      >
        <h2 style={{ marginTop: 0 }}>当前登录状态（占位）</h2>
        <p style={{ margin: "0.25rem 0" }}>状态：{status}</p>
        <p style={{ margin: "0.25rem 0" }}>用户：{user}</p>
        <Link to="/login" style={{ color: appTheme.colors.link }}>
          前往登录/切换
        </Link>
      </section>
      <section
        style={{
          border: `1px solid ${appTheme.colors.border}`,
          borderRadius: "8px",
          padding: "1rem",
          background: appTheme.colors.panel,
          maxWidth: "720px",
        }}
        aria-label="快速导航"
      >
        <h2 style={{ marginTop: 0 }}>快速导航</h2>
        <ul>
          <li>
            <Link to="/">首页 (占位)</Link>
          </li>
          <li>
            <Link to="/404">404 示例</Link>
          </li>
          <li>
            <Link to="/protected">受保护页面（需要 authenticated）</Link>
          </li>
          <li>
            <Link to="/checkpoint/auth">认证与基础设施检查点</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard（受保护，占位数据）</Link>
          </li>
          <li>
            <Link to="/documents">文档管理（受保护，占位）</Link>
          </li>
          <li>
            <Link to="/analysis">分析结果（受保护，占位）</Link>
          </li>
          <li>
            <Link to="/generation">内容生成（受保护，占位）</Link>
          </li>
          <li>
            <Link to="/review">人工审核队列（受保护，占位）</Link>
          </li>
          <li>
            <Link to="/compliance">合规监控仪表板（受保护，占位）</Link>
          </li>
          <li>
            <Link to="/audit">审计日志查看器（受保护，占位）</Link>
          </li>
          <li>
            <Link to="/traceability">追溯链可视化（受保护，占位）</Link>
          </li>
          <li>
            <Link to="/workflow">工作流程控制（受保护，占位）</Link>
          </li>
          <li>
            <Link to="/notifications">实时通知（受保护，占位）</Link>
          </li>
          <li>
            <Link to="/checkpoint/review">人工审核检查点</Link>
          </li>
          <li>
            <Link to="/checkpoint/integration">核心功能集成检查点</Link>
          </li>
          <li>
            <Link to="/checkpoint/documents">文档管理检查点</Link>
          </li>
        </ul>
        <p style={{ color: appTheme.colors.muted, fontSize: "0.95rem" }}>
          后续任务将逐步接入状态管理、API、实时通信、认证等。
        </p>
      </section>
    </main>
  );
}


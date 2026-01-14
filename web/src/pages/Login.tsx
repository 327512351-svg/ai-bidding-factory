import { FormEvent, useState } from "react";
import { appTheme } from "../theme";
import { useDispatch } from "react-redux";
import { authActions } from "../state/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/types";
import { AuthState } from "../state/slices/authSlice";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector<RootState, AuthState | undefined>((state: any) => state.auth);
  const status = auth?.status ?? "unauthenticated";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Fail-closed placeholder: mark as requires human review instead of real auth
    dispatch(
      authActions.setAuthState({
        status: "requires_human_review",
        user: username || "anonymous",
      })
    );
    navigate("/");
  };

  const onDemoAuthenticate = () => {
    // Demo-only shortcut to allow entering protected pages without using Console.
    // Not a real authentication flow; do not use in production.
    dispatch(
      authActions.setAuthState({
        status: "authenticated",
        user: username || "demo",
      })
    );
    navigate("/");
  };

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>登录（占位）</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 3.1 骨架：无真实认证逻辑，提交后标记为 requires_human_review。
      </p>
      <form
        onSubmit={onSubmit}
        style={{
          border: `1px solid ${appTheme.colors.border}`,
          borderRadius: "8px",
          padding: "1rem",
          maxWidth: "420px",
          background: appTheme.colors.panel,
        }}
      >
        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>用户名</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            placeholder="请输入用户名"
          />
        </div>
        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="请输入密码"
          />
        </div>
        <button type="submit" style={buttonStyle}>
          登录（占位）
        </button>
        <button type="button" onClick={onDemoAuthenticate} style={secondaryButtonStyle}>
          演示：进入 authenticated（仅本地占位）
        </button>
      </form>

      <section style={{ marginTop: "1rem", maxWidth: "420px" }}>
        <h3 style={{ margin: "0 0 0.5rem 0" }}>快速跳转</h3>
        <ul style={{ margin: 0, paddingLeft: "1rem", color: appTheme.colors.muted }}>
          <li>
            <Link to="/" style={{ color: appTheme.colors.link }}>
              返回首页
            </Link>
          </li>
          <li>
            <Link to="/checkpoint/auth" style={{ color: appTheme.colors.link }}>
              认证检查点
            </Link>
          </li>
          <li>
            <Link to="/checkpoint/integration" style={{ color: appTheme.colors.link }}>
              集成检查点
            </Link>
          </li>
          {status === "authenticated" ? (
            <>
              <li>
                <Link to="/dashboard" style={{ color: appTheme.colors.link }}>
                  Dashboard（受保护）
                </Link>
              </li>
              <li>
                <Link to="/documents" style={{ color: appTheme.colors.link }}>
                  文档管理（受保护）
                </Link>
              </li>
              <li>
                <Link to="/analysis" style={{ color: appTheme.colors.link }}>
                  分析结果（受保护）
                </Link>
              </li>
              <li>
                <Link to="/generation" style={{ color: appTheme.colors.link }}>
                  内容生成（受保护）
                </Link>
              </li>
              <li>
                <Link to="/review" style={{ color: appTheme.colors.link }}>
                  人工审核（受保护）
                </Link>
              </li>
              <li>
                <Link to="/compliance" style={{ color: appTheme.colors.link }}>
                  合规监控（受保护）
                </Link>
              </li>
              <li>
                <Link to="/audit" style={{ color: appTheme.colors.link }}>
                  审计日志查看（受保护）
                </Link>
              </li>
              <li>
                <Link to="/traceability" style={{ color: appTheme.colors.link }}>
                  追溯链（受保护）
                </Link>
              </li>
              <li>
                <Link to="/notifications" style={{ color: appTheme.colors.link }}>
                  实时通知（受保护）
                </Link>
              </li>
              <li>
                <Link to="/workflow" style={{ color: appTheme.colors.link }}>
                  工作流程控制（受保护）
                </Link>
              </li>
            </>
          ) : (
            <li>受保护页面需要 authenticated（当前状态：{status}）</li>
          )}
        </ul>
      </section>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #1f2937",
  background: "#0b1220",
  color: "#e5e7eb",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #1f2937",
  background: "#38bdf8",
  color: "#0b1220",
  cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "0.5rem",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #1f2937",
  background: "transparent",
  color: "#e5e7eb",
  cursor: "pointer",
};


import { Link } from "react-router-dom";
import { appTheme } from "../theme";

export function NotFound() {
  return (
    <main style={{ padding: "1.5rem" }}>
      <h1>404</h1>
      <p style={{ color: appTheme.colors.muted }}>页面不存在（占位）。</p>
      <Link to="/" style={{ color: appTheme.colors.link }}>
        返回首页
      </Link>
    </main>
  );
}


import { useSelector, useDispatch } from "react-redux";
import { appTheme } from "../theme";
import { authActions, AuthState } from "../state/slices/authSlice";
import { RootState } from "../state/types";
import { Link } from "react-router-dom";

export function AuthStatus() {
  const dispatch = useDispatch();
  const auth = useSelector<RootState, AuthState | undefined>((state: any) => state.auth);

  const status = auth?.status ?? "unauthenticated";
  const user = auth?.user ?? "未登录";

  return (
    <div
      style={{
        padding: "0.75rem 1rem",
        borderBottom: `1px solid ${appTheme.colors.border}`,
        background: appTheme.colors.panel,
      }}
    >
      <span style={{ marginRight: "1rem" }}>状态：{status}</span>
      <span style={{ marginRight: "1rem" }}>用户：{user}</span>
      <Link to="/login" style={{ marginRight: "0.75rem", color: appTheme.colors.link }}>
        登录/切换
      </Link>
      <button
        onClick={() => dispatch(authActions.logout())}
        style={{
          padding: "4px 8px",
          borderRadius: "6px",
          border: `1px solid ${appTheme.colors.border}`,
          background: "transparent",
          color: appTheme.colors.text,
          cursor: "pointer",
        }}
      >
        退出（占位）
      </button>
    </div>
  );
}


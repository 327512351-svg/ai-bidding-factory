import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthState } from "../state/slices/authSlice";
import { RootState } from "../state/types";
import { appTheme } from "../theme";

interface Props {
  element: ReactElement;
  requiredStatus?: "authenticated";
}

/**
 * ProtectedRoute (Task 3.3 placeholder):
 * - Fail-closed: only allow when status === "authenticated"
 * - Otherwise show requires human review / unauthenticated message
 */
export function ProtectedRoute({ element, requiredStatus = "authenticated" }: Props) {
  const auth = useSelector<RootState, AuthState>((state) => state.auth);
  const status = auth?.status ?? "unauthenticated";

  if (status === requiredStatus) {
    return element;
  }

  const message =
    status === "requires_human_review"
      ? "当前账号需要人工确认后才能访问（占位）。"
      : "尚未登录或无权限（占位）。";

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>访问受限</h2>
      <p style={{ color: appTheme.colors.muted }}>{message}</p>
      <Link to="/login" style={{ color: appTheme.colors.link }}>
        前往登录/人工确认
      </Link>
    </div>
  );
}


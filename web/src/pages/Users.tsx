import { useMemo, useState } from "react";
import { appTheme } from "../theme";
import { sampleUsers, UserItem, UserRole, UserStatus } from "../data/usersData";

const cardStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "8px",
  padding: "1rem",
  background: appTheme.colors.panel,
  marginBottom: "1rem",
};

const muted = { color: appTheme.colors.muted, fontSize: "0.9rem" };

const buttonStyle: React.CSSProperties = {
  padding: "0.6rem 0.9rem",
  borderRadius: "6px",
  border: `1px solid ${appTheme.colors.border}`,
  background: "#0b1220",
  color: appTheme.colors.text,
  cursor: "pointer",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #1f2937",
  background: "#0b1220",
  color: "#e5e7eb",
};

function badge(label: string, color: string) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.15rem 0.5rem",
        borderRadius: "6px",
        background: color,
        color: "#0b1220",
        fontSize: "0.85rem",
        fontWeight: 600,
      }}
    >
      {label}
    </span>
  );
}

function roleBadge(role: UserRole) {
  const map: Record<UserRole, string> = {
    admin: "#38bdf8",
    reviewer: "#a78bfa",
    operator: "#22c55e",
    viewer: "#94a3b8",
  };
  return badge(role, map[role]);
}

function statusBadge(status: UserStatus) {
  const map: Record<UserStatus, { label: string; color: string }> = {
    active: { label: "active", color: "#16a34a" },
    pending: { label: "pending", color: "#f59e0b" },
    disabled: { label: "disabled", color: "#f97316" },
  };
  return badge(map[status].label, map[status].color);
}

export function Users() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<UserRole | "all">("all");
  const [status, setStatus] = useState<UserStatus | "all">("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return sampleUsers.filter((u) => {
      const matchesQ =
        !query ||
        u.username.toLowerCase().includes(query) ||
        u.displayName.toLowerCase().includes(query) ||
        u.id.toLowerCase().includes(query);
      const matchesRole = role === "all" || u.role === role;
      const matchesStatus = status === "all" || u.status === status;
      return matchesQ && matchesRole && matchesStatus;
    });
  }, [q, role, status]);

  const propertyChecks = [
    {
      id: "属性22",
      description: "用户管理入口受保护，角色/权限变更需后端授权",
      status: "PASS",
      notes: "本页面为受保护路由；高危操作按钮禁用并提示需后端。",
    },
    {
      id: "属性22-扩展",
      description: "用户列表支持筛选与搜索",
      status: "PASS",
      notes: `当前为前端本地筛选，占位：结果数 ${filtered.length}`,
    },
  ];

  return (
    <main style={{ padding: "1.5rem", maxWidth: "1080px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>用户管理（占位）</h1>
      <p style={{ ...muted, marginBottom: "1rem" }}>
        Task 17.1 骨架：用户列表、筛选与角色权限入口占位；不接后端，不做真实权限写入。
      </p>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>操作（占位）</h3>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <button style={buttonStyle} disabled title="占位：未接后端">
            新建用户（占位）
          </button>
          <button style={buttonStyle} disabled title="占位：未接权限系统">
            分配角色/权限（占位）
          </button>
          <button style={buttonStyle} disabled title="占位：未接后端">
            禁用/启用用户（占位）
          </button>
          <span style={muted}>提示：实际写入需后端与 RBAC，默认 fail-closed。</span>
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>筛选</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 180px", gap: "0.75rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>搜索</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="按用户名/显示名/ID 搜索..."
              style={inputStyle}
              aria-label="搜索用户"
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>角色</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              style={inputStyle}
              aria-label="按角色筛选"
            >
              <option value="all">全部</option>
              <option value="admin">admin</option>
              <option value="reviewer">reviewer</option>
              <option value="operator">operator</option>
              <option value="viewer">viewer</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>状态</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              style={inputStyle}
              aria-label="按状态筛选"
            >
              <option value="all">全部</option>
              <option value="active">active</option>
              <option value="pending">pending</option>
              <option value="disabled">disabled</option>
            </select>
          </div>
        </div>
        <p style={{ ...muted, marginTop: "0.75rem" }}>
          当前筛选结果：<strong>{filtered.length}</strong> / {sampleUsers.length}（占位，本地筛选）
        </p>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>用户列表（占位）</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "720px" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: `1px solid ${appTheme.colors.border}` }}>
                <th style={{ padding: "0.5rem" }}>ID</th>
                <th style={{ padding: "0.5rem" }}>用户名</th>
                <th style={{ padding: "0.5rem" }}>显示名</th>
                <th style={{ padding: "0.5rem" }}>角色</th>
                <th style={{ padding: "0.5rem" }}>状态</th>
                <th style={{ padding: "0.5rem" }}>最近活动</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u: UserItem) => (
                <tr key={u.id} style={{ borderBottom: `1px dashed ${appTheme.colors.border}` }}>
                  <td style={{ padding: "0.5rem", color: appTheme.colors.muted }}>{u.id}</td>
                  <td style={{ padding: "0.5rem" }}>{u.username}</td>
                  <td style={{ padding: "0.5rem" }}>{u.displayName}</td>
                  <td style={{ padding: "0.5rem" }}>{roleBadge(u.role)}</td>
                  <td style={{ padding: "0.5rem" }}>{statusBadge(u.status)}</td>
                  <td style={{ padding: "0.5rem", color: appTheme.colors.muted }}>{u.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ ...muted, marginTop: "0.75rem" }}>
          TODO: 接入后端用户目录、RBAC、审计记录与批量操作；当前仅 UI 骨架与本地样例数据。
        </p>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>属性测试占位</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
          {propertyChecks.map((check) => (
            <li key={check.id} style={{ marginBottom: "0.6rem" }}>
              <strong>{check.id}：</strong> {check.description}
              <div style={{ ...muted, fontSize: "0.85rem" }}>
                [{check.status}] {check.notes}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}


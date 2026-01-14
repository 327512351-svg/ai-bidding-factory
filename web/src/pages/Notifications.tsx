import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appTheme } from "../theme";
import { notificationsActions, NotificationItem } from "../state/slices/notificationSlice";
import { RootState } from "../state/types";
import { sampleNotifications } from "../data/notificationsData";
import { WsClient } from "../realtime/wsClient";

const cardStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "8px",
  padding: "1rem",
  background: appTheme.colors.panel,
  marginBottom: "1rem",
};

const muted = { color: appTheme.colors.muted, fontSize: "0.9rem" };

const propertyChecks = [
  {
    id: "属性12",
    description: "通知列表支持 info/warning/error 分级",
    status: "PASS",
    notes: "占位：根据 level 显示不同颜色，需后续接入真实策略。",
  },
  {
    id: "属性13",
    description: "实时事件应追加到顶部，未读计数可标记",
    status: "WARN",
    notes: "当前仅本地 mock，未实现计数/未读分离，待后续接入。",
  },
];

function badge(level: NotificationItem["level"]) {
  const map: Record<NotificationItem["level"], string> = {
    info: "#38bdf8",
    warning: "#f59e0b",
    error: "#ef4444",
  };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.15rem 0.5rem",
        borderRadius: "6px",
        background: map[level],
        color: "#0b1220",
        fontSize: "0.85rem",
        fontWeight: 600,
      }}
    >
      {level}
    </span>
  );
}

export function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((s: RootState) => s.notifications.items);
  const status = useSelector((s: RootState) => s.notifications.status);
  const [wsClient] = useState(() => new WsClient());

  useEffect(() => {
    const handler = (msg: any) => {
      if (msg?.type === "notification" && msg.payload) {
        dispatch(
          notificationsActions.pushNotification({
            ...(msg.payload as NotificationItem),
            id: msg.payload.id ?? `mock-${Date.now()}`,
            timestamp: msg.payload.timestamp ?? new Date().toISOString(),
            read: false,
          }),
        );
      }
    };
    wsClient.onMessage(handler);
    return () => {
      wsClient.disconnect();
    };
  }, [dispatch, wsClient]);

  const onConnect = () => {
    wsClient.connect("wss://placeholder");
    dispatch(notificationsActions.connect());
    // 连接后立即推一条 mock 事件
    wsClient.emitMock({
      type: "notification",
      payload: {
        title: "已连接占位 WS",
        message: "此为本地 mock 事件，未连接真实后端",
        level: "info",
      },
    });
  };

  const onDisconnect = () => {
    wsClient.disconnect();
    dispatch(notificationsActions.disconnect());
  };

  const onLoadMock = () => {
    sampleNotifications.forEach((item) => {
      dispatch(notificationsActions.pushNotification(item));
    });
  };

  const onMarkAllRead = () => {
    dispatch(notificationsActions.markAllRead());
  };

  const sorted = useMemo(
    () =>
      [...notifications].sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1)),
    [notifications],
  );

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>实时通知（占位）</h1>
      <p style={{ ...muted, marginBottom: "1rem" }}>
        Task 14 骨架：支持本地 mock 通知、连接占位 WS、属性测试说明；不接真实后端。
      </p>

      <section style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <button style={buttonStyle} onClick={onConnect} disabled={status === "connected"}>
          连接（占位）
        </button>
        <button style={buttonStyle} onClick={onDisconnect} disabled={status === "disconnected"}>
          断开（占位）
        </button>
        <button style={buttonStyle} onClick={onLoadMock}>
          加载样例通知
        </button>
        <button style={buttonStyle} onClick={onMarkAllRead}>
          标记全部已读
        </button>
        <span style={muted}>状态：{status}</span>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>通知列表</h3>
        {sorted.length === 0 ? (
          <p style={muted}>暂无通知（占位）</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {sorted.map((n) => (
              <div
                key={n.id}
                style={{
                  border: `1px dashed ${appTheme.colors.border}`,
                  borderRadius: "8px",
                  padding: "0.75rem",
                  background: "#0b1220",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 600 }}>{n.title}</div>
                  {badge(n.level)}
                </div>
                <p style={{ ...muted, margin: "0.35rem 0" }}>{n.message}</p>
                <div style={{ ...muted, fontSize: "0.85rem" }}>
                  {n.timestamp} · {n.read ? "已读" : "未读"}
                </div>
              </div>
            ))}
          </div>
        )}
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
        <p style={{ ...muted, fontSize: "0.85rem", marginTop: "0.5rem" }}>
          TODO: 连接真实 WS / SSE、实现未读计数与持久化；当前仅本地 mock。
        </p>
      </section>
    </main>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "0.6rem 1rem",
  borderRadius: "6px",
  border: `1px solid ${appTheme.colors.border}`,
  background: "#0b1220",
  color: appTheme.colors.text,
  cursor: "pointer",
};


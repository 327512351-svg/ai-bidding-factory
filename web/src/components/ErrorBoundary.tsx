import React from "react";
import { ErrorNotice } from "./ErrorNotice";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  message?: string;
};

/**
 * 全局错误边界（Task 19.1 占位）
 * - 捕获子树渲染错误，展示降级 UI
 * - 不上报网络，保持 fail-closed 提示
 */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, message: undefined };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error?.message || "未知错误" };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // 仅占位：不发送到后端，避免泄露；后续可接入日志/告警
    console.error("ErrorBoundary caught:", error?.message, error, info);
  }

  onReload = () => {
    window.location.reload();
  };

  onBackHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorNotice
          title="页面发生错误（占位）"
          message={this.state.message || "未知错误，请人工检查。"}
          details="当前为占位错误边界，未接入后端上报；请刷新或返回首页。"
          onRetry={this.onReload}
          onHome={this.onBackHome}
        />
      );
    }
    return this.props.children;
  }
}


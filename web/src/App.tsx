import { Route, Routes, Navigate } from "react-router-dom";
import { appTheme } from "./theme";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { AuthStatus } from "./components/AuthStatus";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ProtectedDemo } from "./pages/ProtectedDemo";
import { AuthCheckpoint } from "./pages/AuthCheckpoint";
import { DocumentsCheckpoint } from "./pages/DocumentsCheckpoint";
import { ReviewCheckpoint } from "./pages/ReviewCheckpoint";
import { IntegrationCheckpoint } from "./pages/IntegrationCheckpoint";
import { Dashboard } from "./pages/Dashboard";
import { Documents } from "./pages/Documents";
import { Analysis } from "./pages/Analysis";
import { ContentGeneration } from "./pages/ContentGeneration";
import { Review } from "./pages/Review";
import { ComplianceDashboard } from "./pages/ComplianceDashboard";
import { AuditLogs } from "./pages/AuditLogs";
import { Traceability } from "./pages/Traceability";
import { Workflow } from "./pages/Workflow";
import { Notifications } from "./pages/Notifications";
import { Reports } from "./pages/Reports";
import { Config } from "./pages/Config";
import { Monitoring } from "./pages/Monitoring";
import { Users } from "./pages/Users";
import { SystemCheckpoint } from "./pages/SystemCheckpoint";
import { FinalReadiness } from "./pages/FinalReadiness";
import { Help } from "./pages/Help";
import { DebugCrash } from "./pages/DebugCrash";
import { DebugSkeleton } from "./pages/DebugSkeleton";

export default function App() {
  return (
    <div style={{ background: appTheme.colors.background, minHeight: "100vh", color: appTheme.colors.text }}>
      <AuthStatus />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/protected"
            element={<ProtectedRoute element={<ProtectedDemo />} requiredStatus="authenticated" />}
          />
          <Route path="/checkpoint/auth" element={<AuthCheckpoint />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} requiredStatus="authenticated" />}
          />
          <Route
            path="/documents"
            element={<ProtectedRoute element={<Documents />} requiredStatus="authenticated" />}
          />
          <Route path="/checkpoint/documents" element={<DocumentsCheckpoint />} />
          <Route
            path="/analysis"
            element={<ProtectedRoute element={<Analysis />} requiredStatus="authenticated" />}
          />
          <Route
            path="/generation"
            element={<ProtectedRoute element={<ContentGeneration />} requiredStatus="authenticated" />}
          />
          <Route
            path="/review"
            element={<ProtectedRoute element={<Review />} requiredStatus="authenticated" />}
          />
          <Route
            path="/compliance"
            element={<ProtectedRoute element={<ComplianceDashboard />} requiredStatus="authenticated" />}
          />
          <Route
            path="/audit"
            element={<ProtectedRoute element={<AuditLogs />} requiredStatus="authenticated" />}
          />
          <Route
            path="/traceability"
            element={<ProtectedRoute element={<Traceability />} requiredStatus="authenticated" />}
          />
          <Route
            path="/workflow"
            element={<ProtectedRoute element={<Workflow />} requiredStatus="authenticated" />}
          />
          <Route
            path="/notifications"
            element={<ProtectedRoute element={<Notifications />} requiredStatus="authenticated" />}
          />
          <Route
            path="/reports"
            element={<ProtectedRoute element={<Reports />} requiredStatus="authenticated" />}
          />
          <Route
            path="/config"
            element={<ProtectedRoute element={<Config />} requiredStatus="authenticated" />}
          />
          <Route
            path="/monitoring"
            element={<ProtectedRoute element={<Monitoring />} requiredStatus="authenticated" />}
          />
          <Route
            path="/users"
            element={<ProtectedRoute element={<Users />} requiredStatus="authenticated" />}
          />
          <Route
            path="/checkpoint/system"
            element={<ProtectedRoute element={<SystemCheckpoint />} requiredStatus="authenticated" />}
          />
          <Route
            path="/checkpoint/final"
            element={<ProtectedRoute element={<FinalReadiness />} requiredStatus="authenticated" />}
          />
          <Route
            path="/help"
            element={<ProtectedRoute element={<Help />} requiredStatus="authenticated" />}
          />
          <Route
            path="/debug/skeleton"
            element={<ProtectedRoute element={<DebugSkeleton />} requiredStatus="authenticated" />}
          />
          <Route
            path="/debug/crash"
            element={<ProtectedRoute element={<DebugCrash />} requiredStatus="authenticated" />}
          />
          <Route path="/checkpoint/review" element={<ReviewCheckpoint />} />
          <Route path="/checkpoint/integration" element={<IntegrationCheckpoint />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}


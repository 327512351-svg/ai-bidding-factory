import { Route, Routes, Navigate } from "react-router-dom";
import { appTheme } from "./theme";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { AuthStatus } from "./components/AuthStatus";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ProtectedDemo } from "./pages/ProtectedDemo";
import { AuthCheckpoint } from "./pages/AuthCheckpoint";
import { Dashboard } from "./pages/Dashboard";
import { Documents } from "./pages/Documents";
import { DocumentsCheckpoint } from "./pages/DocumentsCheckpoint";
import { Analysis } from "./pages/Analysis";
import { ContentGeneration } from "./pages/ContentGeneration";
import { Review } from "./pages/Review";
import { ReviewCheckpoint } from "./pages/ReviewCheckpoint";
import { IntegrationCheckpoint } from "./pages/IntegrationCheckpoint";
import { ComplianceDashboard } from "./pages/ComplianceDashboard";
import { AuditLogs } from "./pages/AuditLogs";
import { Traceability } from "./pages/Traceability";
import { Workflow } from "./pages/Workflow";
import { Notifications } from "./pages/Notifications";

export default function App() {
  return (
    <div style={{ background: appTheme.colors.background, minHeight: "100vh", color: appTheme.colors.text }}>
      <AuthStatus />
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
        <Route path="/checkpoint/review" element={<ReviewCheckpoint />} />
        <Route path="/checkpoint/integration" element={<IntegrationCheckpoint />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}


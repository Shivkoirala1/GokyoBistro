import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Wrap admin/worker-only pages: <ProtectedRoute roles={["admin","worker"]}><X/></ProtectedRoute>
export default function ProtectedRoute({ roles, children }) {
  const { user } = useAuth();
  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

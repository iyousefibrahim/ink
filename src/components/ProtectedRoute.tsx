import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute({ allowedRoles }: { allowedRoles?: string[] }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role ?? "")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";


export function PublicRoute() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

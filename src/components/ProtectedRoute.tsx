import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router";
import FullScreenLoader from "./FullScreenLoader";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <FullScreenLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

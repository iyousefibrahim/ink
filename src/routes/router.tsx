import { createBrowserRouter } from "react-router";
import App from "../App";
import { PublicRoute } from "../components/PublicRoute";
import { ProtectedRoute } from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // Public routes
      {
        path: "/",
        element: <PublicRoute />,
        children: [
          // { index: true, element: <LoginPage /> },
          // { path: "login", element: <LoginPage /> },
          // { path: "register", element: <RegisterPage /> },
        ],
      },

      // Protected routes
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          // { index: true, element: <HomePage /> },
          // { path: "home", element: <HomePage /> },
          // { path: "profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
]);

export default router;

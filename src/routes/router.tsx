import { createBrowserRouter } from "react-router";
import App from "../App";
import { PublicRoute } from "../components/PublicRoute";
import { ProtectedRoute } from "../components/ProtectedRoute";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // Public routes
      {
        path: "/",
        element: <PublicRoute />,
        children: [
          { index: true, element: <SignInPage /> },
          { path: "signin", element: <SignInPage /> },
          { path: "signup", element: <SignUpPage /> },
        ],
      },

      // Protected routes
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          // { index: true, element: <HomePage /> },
          { path: "home", element: <HomePage /> },
          // { path: "profile", element: <ProfilePage /> },
        ],
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;

import { createBrowserRouter } from "react-router";
import App from "../App";
import { PublicRoute } from "../components/PublicRoute";
import ProtectedRoute from "@/components/ProtectedRoute";
import SignInPage from "@/pages/Auth/SignInPage";
import SignUpPage from "@/pages/Auth/SignUpPage";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import ForgotPasswordPage from "@/pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/Auth/ResetPasswordPage";
import PostPage from "@/pages/PostPage";
import AppLayout from "@/Layouts/AppLayout";
import AuthLayout from "@/Layouts/AuthLayout";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // Public routes
      {
        path: "/",
        element: <PublicRoute />,
        children: [
          {
            path: "",
            element: <AuthLayout />,
            children: [
              { index: true, element: <SignInPage /> },
              { path: "signin", element: <SignInPage /> },
              { path: "signup", element: <SignUpPage /> },
              { path: "forgot-password", element: <ForgotPasswordPage /> },
            ],
          },
        ],
      },

      { path: "reset-password", element: <ResetPasswordPage /> },

      // Protected routes
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <AppLayout />,
            children: [
              { path: "home", element: <HomePage /> },
              { path: "post/:id", element: <PostPage /> },
            ],
          },

          // { path: "profile", element: <ProfilePage /> },
        ],
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;

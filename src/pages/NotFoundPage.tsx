import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-accent dark:bg-background transition-colors">
      <h1 className="text-6xl font-bold text-red-600 dark:text-red-500">404</h1>
      <p className="text-xl mt-4 text-gray-700 dark:text-gray-300">
        Oops! Page not found.
      </p>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        The page you’re looking for doesn’t exist.
      </p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
}

export default NotFoundPage;

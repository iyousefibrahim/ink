function ErrorPost({ error }: { error: Error }) {
  return (
    <div className="border border-red-200 dark:border-red-800 p-6 rounded-xl bg-red-50 dark:bg-red-900/10">
      <p className="text-red-600 dark:text-red-400 font-medium">
        Error loading posts: {error.message || "Something went wrong."}
      </p>
    </div>
  );
}

export default ErrorPost;

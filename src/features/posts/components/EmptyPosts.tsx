function EmptyPosts() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <span className="text-2xl">📝</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        No posts yet
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        Be the first to share something with the community!
      </p>
    </div>
  );
}

export default EmptyPosts;

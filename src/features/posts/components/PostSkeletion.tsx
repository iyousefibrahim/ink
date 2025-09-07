import { Skeleton } from "@/components/ui/skeleton";

function PostSkeletion() {
  return (
    <div
      className="border border-gray-200 dark:border-gray-700 p-4 mx-auto bg-white dark:bg-gray-800 shadow-sm"
      style={{ width: "752px", height: "200px", borderRadius: "16px" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-1 flex-1">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 mb-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-3">
        <Skeleton className="h-8 w-16 rounded-md" />
        <Skeleton className="h-8 w-16 rounded-md" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
    </div>
  );
}

export default PostSkeletion;

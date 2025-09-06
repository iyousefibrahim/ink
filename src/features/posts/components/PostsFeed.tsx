// PostsFeed.tsx
import { useQuery } from "@tanstack/react-query";
import {
  MoreHorizontal,
  Trash2,
  Edit3,
  Heart,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import supabase from "@/lib/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// NEEDS A LOT OF REFACTOR HERE :_) !

export type PostWithProfile = {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

async function getAllPosts() {
  const { data, error } = await supabase.from("posts_with_users").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data as PostWithProfile[];
}

// Skeleton component for loading state
function PostSkeleton() {
  return (
    <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-start gap-3 mb-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-48 w-full mt-4 rounded-lg" />
    </div>
  );
}

export default function PostsFeed() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts-with-profiles"],
    queryFn: () => getAllPosts(),
  });

  const handleDeletePost = (postId: string) => {
    // TODO: Implement delete functionality
    console.log("Delete post:", postId);
  };

  const handleUpdatePost = (postId: string) => {
    // TODO: Implement update functionality
    console.log("Update post:", postId);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;

    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-200 dark:border-red-800 p-6 rounded-xl bg-red-50 dark:bg-red-900/10">
        <p className="text-red-600 dark:text-red-400 font-medium">
          Error loading posts: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-15 gap-10">
      {posts?.map((post) => {
        const displayName = post.full_name || post.username || "Anonymous";
        const username = post.username || `user${post.user_id.substring(0, 8)}`;

        return (
          <article
            key={post.id}
            className="border border-gray-200 dark:border-gray-700 p-6 rounded-xl md:w-[50%] w-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  {post.avatar_url ? (
                    <img
                      src={post.avatar_url}
                      alt={displayName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-gray-100 dark:ring-gray-700">
                      <span className="text-sm font-semibold text-white">
                        {displayName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {displayName}
                    </h3>
                    <span className="text-gray-500 dark:text-gray-400 text-sm truncate">
                      @{username}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 text-sm">
                      ·
                    </span>
                    <time className="text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">
                      {formatTimeAgo(post.created_at)}
                    </time>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => handleUpdatePost(post.id)}
                    className="cursor-pointer"
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit post
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeletePost(post.id)}
                    className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/10"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>

              {post.image_url && (
                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img
                    src={post.image_url}
                    alt="Post attachment"
                    className="w-full max-h-96 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => {
                      // TODO: Implement image modal/lightbox
                      window.open(post.image_url, "_blank");
                    }}
                  />
                </div>
              )}
            </div>

            {/* Interaction buttons placeholder */}
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 h-8 px-3 flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                <span className="text-sm">Like</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 h-8 px-3 flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">Reply</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 h-8 px-3 flex items-center gap-2"
              >
                <Bookmark className="h-4 w-4" />
                <span className="text-sm">Save</span>
              </Button>
            </div>
          </article>
        );
      })}

      {posts?.length === 0 && (
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
      )}
    </div>
  );
}

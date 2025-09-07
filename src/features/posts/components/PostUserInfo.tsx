import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import type { PostWithProfile } from "../types";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import { Link } from "react-router";

function PostUserInfo({ post }: { post: PostWithProfile }) {
  const displayName = post.full_name || post.username || "Anonymous";
  const username = post.username || `user${post.user_id.substring(0, 8)}`;
  return (
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="relative flex-shrink-0">
        {post.avatar_url ? (
          <Link to={`/profile/${post.user_id}`}>
            <Avatar>
              <AvatarImage
                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                src={post.avatar_url}
                alt={displayName}
              />
              <AvatarFallback>
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-gray-100 dark:ring-gray-700">
            <Link to={`/profile/${post.user_id}`}>
              <span className="text-sm font-semibold text-white">
                {displayName.charAt(0).toUpperCase()}
              </span>
            </Link>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-x-2 flex-wrap">
          <div className="flex flex-col">
            <Link to={`/profile/${post.user_id}`}>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {displayName}
              </h3>
            </Link>
            <Link to={`/profile/${post.user_id}`}>
              <span className="text-gray-500 dark:text-gray-400 text-sm truncate">
                @{username}
              </span>
            </Link>
          </div>

          <time className="text-gray-500  dark:text-gray-400 text-sm whitespace-nowrap">
            {formatTimeAgo(post.created_at)}
          </time>
        </div>
      </div>
    </div>
  );
}

export default PostUserInfo;

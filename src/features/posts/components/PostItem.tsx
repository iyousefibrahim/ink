import type { PostWithProfile } from "../types";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import PostUserInfo from "./PostUserInfo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit3, MoreHorizontal, Trash2 } from "lucide-react";
import { useDeletePost } from "../hooks/useDeletePost";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router";

function PostItem({ post }: { post: PostWithProfile }) {
  const { mutate } = useDeletePost();
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId: string | undefined = user?.id;

  function handlePostDelete(postId: string) {
    mutate(postId, {
      onSuccess: () => {
        toast.success("Post deleted successfully!");
      },
    });
  }

  return (
    <article
      onClick={() => navigate(`/post/${post.id}`)}
      key={post.id}
      className="group border border-gray-200 dark:border-gray-700 p-6 rounded-2xl  w-full md:w-[50%] bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 transition-all duration-300 cursor-pointer  hover:border-gray-300 dark:hover:border-gray-600"
    >
      <div className="flex items-start justify-between mb-4">
        <PostUserInfo post={post} />
        {post.user_id === userId ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 cursor-pointer text-gray-400 hover:text-gray-600 
                 dark:hover:text-gray-300 hover:bg-gray-100 
                 dark:hover:bg-gray-700"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit post
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handlePostDelete(post.id);
                }}
                className="text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>

      <div className="space-y-4">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap text-[15px] font-normal">
          {post.content}
        </p>

        {post.image_url && (
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
            <img
              src={post.image_url}
              alt="Post attachment"
              className="w-full h-80 sm:h-96 md:h-[20rem] object-cover hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Implement image modal/lightbox
                window.open(post.image_url, "_blank");
              }}
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Enhanced interaction buttons */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 h-9 px-3 flex items-center gap-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">Like</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 h-9 px-3 flex items-center gap-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Reply</span>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 h-9 px-3 flex items-center gap-2 rounded-full hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <Bookmark className="h-4 w-4" />
          <span className="text-sm font-medium">Save</span>
        </Button>
      </div>
    </article>
  );
}

export default PostItem;

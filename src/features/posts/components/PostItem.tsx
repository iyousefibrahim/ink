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
      className="border cursor-pointer border-gray-200 dark:border-gray-700 p-6 rounded-xl md:w-[50%] w-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <PostUserInfo post={post} />
        {post.user_id === userId ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 
                 dark:hover:text-gray-300 hover:bg-gray-100 
                 dark:hover:bg-gray-700"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit post
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handlePostDelete(post.id);
                }}
                className="text-red-600 dark:text-red-400"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          ""
        )}
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
}

export default PostItem;

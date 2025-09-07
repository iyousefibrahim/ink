import { useMutation, useQueryClient } from "@tanstack/react-query";
import deletePost from "../apis/posts-api";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      return await deletePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts_with_users"] });
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });
}

import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../apis/posts-api";

function usePostById(postId: string | undefined) {
  return useQuery({
    queryKey: ["posts_with_users", postId],
    queryFn: async () => {
      if (!postId) throw new Error("Post ID is missing");
      return await getPostById(postId);
    },
    enabled: !!postId,
  });
}

export default usePostById;

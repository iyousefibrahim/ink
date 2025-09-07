import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../apis/posts-api";

function usePostById(postId: string | undefined) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      if (!postId) throw new Error("Post ID is missing");
      return await getPostById(postId);
    },
    enabled: !!postId,
  });
}

export default usePostById;

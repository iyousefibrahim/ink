import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../apis/posts-api";

function usePosts() {
  return useQuery({
    queryKey: ["posts_with_users"],
    queryFn: () => getAllPosts(),
  });
}

export default usePosts;

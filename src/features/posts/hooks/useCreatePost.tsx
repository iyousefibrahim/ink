import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../apis/posts-api";
import { toast } from "sonner";
import type { postInput } from "../types";
import { useAuth } from "@/contexts/AuthContext";

function usePost() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      post,
      imageFile,
    }: {
      post: postInput;
      imageFile: File | null;
    }) => {
      if (!user?.id) throw new Error("User not authenticated");
      return createPost(post, imageFile, user.id);
    },
    onSuccess: () => {
      toast.success("Post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(`Error creating post: ${error.message}`);
    },
  });
}

export default usePost;

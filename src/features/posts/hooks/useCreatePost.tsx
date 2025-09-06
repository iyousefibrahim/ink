import { useMutation } from "@tanstack/react-query";
import { createPost } from "../apis/posts-api";
import { toast } from "sonner";
import type { postInput } from "../types";

function usePost() {
  return useMutation({
    mutationFn: ({
      post,
      imageFile,
    }: {
      post: postInput;
      imageFile: File | null;
    }) => createPost(post, imageFile),
    onSuccess: () => {
      toast.success("Post created successfully!");
    },
    onError: (error) => {
      toast.error(`Error creating post: ${error.message}`);
    },
  });
}

export default usePost;

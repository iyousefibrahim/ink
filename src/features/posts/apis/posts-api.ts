import supabase from "@/lib/supabaseClient";
import type { postInput, PostWithProfile } from "../types";

export async function createPost(
  post: postInput,
  imageFile: File | null,
  user_id: string
) {
  try {
    if (imageFile) {
      const { data: imageData, error: imageError } = await supabase.storage
        .from("post-images")
        .upload(`${Date.now()}-${imageFile.name}`, imageFile);
      if (imageError) throw new Error(imageError.message);

      const { data: urlData } = supabase.storage
        .from("post-images")
        .getPublicUrl(imageData.path);

      post.image_url = urlData.publicUrl;
    }
    post.user_id = user_id;
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .insert([post]);

    if (postError) throw new Error(postError.message);

    return postData;
  } catch (err: any) {
    throw new Error(err.message || "Failed to create post");
  }
}

export async function getAllPosts() {
  const { data, error } = await supabase
    .from("posts_with_users")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data as PostWithProfile[];
}

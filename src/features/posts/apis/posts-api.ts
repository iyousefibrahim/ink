import supabase from "@/lib/supabaseClient";
import type { postInput } from "../types";

export async function createPost(post: postInput, imageFile: File | null) {
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

    const { data: postData, error: postError } = await supabase
      .from("posts")
      .insert([post]);

    if (postError) throw new Error(postError.message);

    return postData;
  } catch (err: any) {
    throw new Error(err.message || "Failed to create post");
  }
}

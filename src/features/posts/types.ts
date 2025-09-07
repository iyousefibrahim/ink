export type postInput = {
  content: string;
  image_url?: string;
  user_id: string;
};

export type Post = {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
};

export type PostWithProfile = {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

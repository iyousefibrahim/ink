import supabase from "@/lib/supabaseClient";
import type { SignUpInputs } from "../types";
import type { User } from "@supabase/supabase-js";

export async function uploadAvatar(userId: string, avatarFile: File | null) {
  if (!avatarFile) return null;
  const fileExt = avatarFile.name.split(".").pop();
  const fileName = `${userId}.${fileExt}`;
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatarFile, { upsert: true });

  if (error) {
    return null;
  }

  return supabase.storage.from("avatars").getPublicUrl(data.path).data
    .publicUrl;
}

export async function signUp(
  data: SignUpInputs,
  authenticated: (user: User) => void,
  avatarFile: File | null,
  avatarUrl: string | null
) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.first_name + " " + data.last_name,
        username: data.username,
        avatarUrl: avatarUrl,
      },
    },
  });

  if (authError) throw authError;

  const userId = authData.user?.id;
  if (!userId) throw new Error("User ID not found");

  const avatar_url = await uploadAvatar(userId, avatarFile);

  const { error: updateError } = await supabase.auth.updateUser({
    data: { avatarUrl: avatar_url },
  });
  if (updateError) throw updateError;

  if (authData.user) {
    authenticated(authData.user);
  }

  return authData.user;
}

export async function signInWithEmail(
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
  authenticated: (user: User) => void
): Promise<User | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  if (data.user) {
    authenticated(data.user); // ← هنا بيعمل set للـ user في AuthContext
    return data.user;
  }

  return null;
}

export async function signInWithGoogle(authenticated?: (user: User) => void) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) throw error;

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) throw sessionError;

  if (session?.user) {
    authenticated?.(session.user);
    return session.user;
  }
  return null;
}

export async function forgotPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
  return data;
}

// auth-api.ts
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

  if (error) return null;

  return supabase.storage.from("avatars").getPublicUrl(data.path).data
    .publicUrl;
}

export async function signUp(
  data: SignUpInputs,
  authenticated: (user: User) => void,
  avatarFile: File | null
) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.first_name + " " + data.last_name,
        username: data.username || null,
      },
    },
  });

  if (authError) throw authError;

  const user = authData.user;
  if (!user) throw new Error("User not found after signup");

  const avatarUrl = await uploadAvatar(user.id, avatarFile);

  if (avatarUrl) {
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatarUrl },
    });
    if (updateError)
      console.warn("Failed to update avatar in auth.users:", updateError);
  }

  const { error: profileError } = await supabase.from("profiles").insert([
    {
      id: user.id,
      username: data.username || null,
      full_name: data.first_name + " " + data.last_name || null,
      avatar_url: avatarUrl || null,
    },
  ]);
  if (profileError) console.warn("Failed to create profile:", profileError);
  authenticated(user);

  return user;
}

export async function signInWithEmail(
  { email, password }: { email: string; password: string },
  authenticated: (user: User) => void
) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  if (data.user) {
    authenticated(data.user);
    return data.user;
  }
  return null;
}

export async function signInWithGoogle(authenticated?: (user: User) => void) {
  const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
  if (error) throw error;

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) throw sessionError;

  if (sessionData.session?.user) {
    const user = sessionData.session.user;
    authenticated?.(user);

    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!existingProfile) {
      await supabase.from("profiles").insert([
        {
          id: user.id,
          username: user.user_metadata?.username || null,
          full_name: user.user_metadata?.full_name || null,
          avatar_url: user.user_metadata?.avatar_url || null,
        },
      ]);
    }

    return user;
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

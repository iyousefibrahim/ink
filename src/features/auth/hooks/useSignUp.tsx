import { useMutation } from "@tanstack/react-query";
import type { SignUpInputs } from "../types";
import { signUp } from "../apis/auth-api";

export function useSignUp() {
  return useMutation({
    mutationFn: ({
      data,
      avatarFile,
      avatarUrl,
    }: {
      data: SignUpInputs;
      avatarFile: File | null;
      avatarUrl: string | null;
    }) => signUp(data, () => {}, avatarFile, avatarUrl),
  });
}

import { useMutation } from "@tanstack/react-query";
import type { SignUpInputs } from "../types";
import { signUp } from "../apis/auth-api";

export function useSignUp() {
  return useMutation({
    mutationFn: ({
      data,
      avatarFile,
    }: {
      data: SignUpInputs;
      avatarFile: File | null;
    }) => signUp(data, () => {}, avatarFile),
  });
}

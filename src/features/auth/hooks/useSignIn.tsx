import { useMutation } from "@tanstack/react-query";
import { signInWithEmail } from "../apis/auth-api";
import { useAuth } from "@/contexts/AuthContext";

function useSignIn() {
  const { authenticated } = useAuth();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      signInWithEmail(data, authenticated),
  });
}

export default useSignIn;

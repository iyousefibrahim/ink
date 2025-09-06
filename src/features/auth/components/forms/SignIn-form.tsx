import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../validations/signInSchema";
import useSignIn from "../../hooks/useSignIn";
import SignWithGoogle from "../SignWithGoogle";
import { signInWithGoogle } from "../../apis/auth-api";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import Divider from "@/components/Divider";
import Formfooter from "./Form-footer";

export type SignInInputs = z.infer<typeof signInSchema>;

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPending } = useSignIn();
  const { authenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInInputs) {
    mutate(data, {
      onSuccess: (user) => {
        toast.success("Welcome back " + user?.user_metadata?.full_name);
      },
      onError: (error) => {
        toast.error(`Sign-in failed: ${error.message}`);
      },
    });
  }

  async function handleGoogleSignIn() {
    await signInWithGoogle(authenticated);
  }

  return (
    <div
      className={cn("flex flex-col items-center w-full gap-6", className)}
      {...props}
    >
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Email */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>

              <Divider title="SignIn" />
              <SignWithGoogle onClick={handleGoogleSignIn} />
            </div>

            {/* Footer */}
            <Formfooter
              title="Sign Up"
              Linkto="/signup"
              msg="Don't have an account?"
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import type { SignUpInputs } from "../../types";
import { useSignUp } from "../../hooks/useSignUp";
import { signInWithGoogle } from "../../apis/auth-api";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit } = useForm<SignUpInputs>();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const { authenticated } = useAuth();
  const { mutate, isLoading, error } = useSignUp();

  // Watch file input change
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  }

  async function onSubmit(data: SignUpInputs) {
    mutate(
      { data, avatarFile, avatarUrl },
      {
        onSuccess: (user) => {
          console.log("User signed in context:", user);
          console.log("Sign-up successful");
        },
      }
    );
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
          <CardTitle>SignUp</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Avatar Upload */}
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} />
                ) : (
                  <AvatarFallback>U</AvatarFallback>
                )}
              </Avatar>
              <input
                className="w-full"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Name Fields */}
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="John"
                  required
                  {...register("first_name")}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Doe"
                  required
                  {...register("last_name")}
                />
              </div>
            </div>

            {/* Username */}
            <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                required
                {...register("username")}
              />
            </div>

            {/* Email */}
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email")}
              />
            </div>

            {/* Password */}
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                SignUp
              </Button>
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full"
              >
                SignUp with Google
              </Button>
            </div>

            {/* Footer */}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/signin" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Camera, Loader2, Upload, User, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { useSignUp } from "../../hooks/useSignUp";
import { signInWithGoogle } from "../../apis/auth-api";
import { z } from "zod";
import { signUpSchema } from "../../validations/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SignWithGoogle from "../SignWithGoogle";

export type SignUpInputs = z.infer<typeof signUpSchema>;

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { authenticated } = useAuth();
  const { mutate, isPending } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  }

  async function onSubmit(data: SignUpInputs) {
    mutate(
      { data, avatarFile, avatarUrl },
      {
        onSuccess: (user) => {
          toast.success(
            "Sign-up successful! Welcome " + user?.user_metadata.full_name
          );
        },
        onError: (error) => {
          toast.error(`Sign-up failed: ${error.message}`);
        },
      }
    );
  }

  async function handleGoogleSignUp() {
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
            <div className="flex justify-center mb-6">
              <div className="relative group cursor-pointer">
                <div
                  className={`w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg transition-all duration-300`}
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-500" />
                    </div>
                  )}
                </div>
                <div
                  className={`absolute inset-0 bg-black/40 rounded-full flex items-center justify-center transition-opacity duration-300`}
                >
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2 shadow-lg">
                  <Upload className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Name Fields */}
            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-1">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  type="text"
                  {...register("first_name")}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" type="text" {...register("last_name")} />
                {errors.last_name && (
                  <p className="text-red-500 text-sm">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" {...register("username")} />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 absolute -left-5" />
                ) : (
                  <Eye className="w-5 h-5 absolute -left-5" />
                )}
              </button>
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
                  "Sign Up"
                )}
              </Button>
            </div>
            <SignWithGoogle onClick={handleGoogleSignUp} />

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

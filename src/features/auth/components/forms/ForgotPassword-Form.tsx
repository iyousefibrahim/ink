import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { forgotPassword } from "@/features/auth/apis/auth-api";
import { forgotPasswordSchema } from "../../validations/forgotPasswordSchema";

type ForgotPasswordInputs = z.infer<typeof forgotPasswordSchema>;

function ForgotPasswordForm() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(inputs: ForgotPasswordInputs) {
    try {
      await forgotPassword(inputs.email);
      setSuccess(true);
    } catch (err: Error | any) {
      setSuccess(false);
      toast.error(err.message || "Something went wrong. Try again later.");
    }
  }

  return (
    <div className="flex items-center justify-center bg-accent dark:bg-background transition-colors">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                className="my-3"
                id="email"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>

            {success && (
              <p className="text-sm text-green-500 text-center">
                A reset link has been sent. Please check your email.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPasswordForm;

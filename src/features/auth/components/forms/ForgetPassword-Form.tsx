import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { forgetPassword } from "@/features/auth/apis/auth-api";
import { forgotPasswordSchema } from "../../validations/forgotPasswordSchema";

type ForgotPasswordInputs = z.infer<typeof forgotPasswordSchema>;

function ForgetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(inputs: ForgotPasswordInputs) {
    try {
      await forgetPassword(inputs.email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (err: Error | any) {
      toast.error(err.message || "Something went wrong. Try again later.");
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-accent dark:bg-background transition-colors">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgetPasswordForm;

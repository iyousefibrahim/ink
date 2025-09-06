import { SignInForm } from "@/features/auth/components/forms/SignIn-form";

function SignInPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-accent dark:bg-background transition-colors">
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  );
}

export default SignInPage;

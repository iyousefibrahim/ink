import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";
import { SignUpForm } from "@/features/auth/components/forms/SignUp-form";

function SignUpPage() {
  return (
    <>
      <NavbarDesktop />
      <NavbarMobile />
      <div className="flex mt-15  w-full items-center justify-center p-6 md:p-10 bg-accent dark:bg-background transition-colors">
        <SignUpForm />
      </div>
    </>
  );
}

export default SignUpPage;

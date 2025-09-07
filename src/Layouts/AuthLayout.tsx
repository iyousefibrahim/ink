import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-accent dark:bg-background transition-colors">
      <div className="w-full">
        <NavbarDesktop />
        <NavbarMobile />
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;

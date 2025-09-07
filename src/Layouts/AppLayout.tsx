import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="bg-background transition-colors h-full">
      <div className="pt-25 md:my-container">
        <NavbarDesktop />
        <NavbarMobile />
        <main className="flex-1 pt-20 px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

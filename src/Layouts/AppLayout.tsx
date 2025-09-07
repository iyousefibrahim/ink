import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="bg-background transition-colors h-full">
      <div className="md:my-container">
        <NavbarDesktop />
        <NavbarMobile />
        <main className="flex-1 px-4 h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="transition-colors md:my-container">
      <NavbarDesktop />
      <NavbarMobile />
      <Outlet />
    </div>
  );
}

import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";

function HomePage() {
  return (
    <div className="bg-accent dark:bg-background transition-colors h-screen">
      <NavbarDesktop />
      <NavbarMobile />
    </div>
  );
}

export default HomePage;

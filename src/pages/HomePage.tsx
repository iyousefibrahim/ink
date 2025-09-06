import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";
import CreatePost from "@/features/posts/components/CreatePost";

function HomePage() {
  return (
    <div className="bg-background transition-colors h-screen">
      <NavbarDesktop />
      <NavbarMobile />
      <div className="pt-25 my-container">
        <CreatePost />
      </div>
    </div>
  );
}

export default HomePage;

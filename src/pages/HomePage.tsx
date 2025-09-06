import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";
import CreatePost from "@/features/posts/components/CreatePost";
import PostsFeed from "@/features/posts/components/PostsFeed";

function HomePage() {
  return (
    <div className="bg-background transition-colors h-full">
      <NavbarDesktop />
      <NavbarMobile />
      <div className="pt-25 md:my-container">
        <CreatePost />
        <PostsFeed />
      </div>
    </div>
  );
}

export default HomePage;

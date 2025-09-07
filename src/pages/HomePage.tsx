import CreatePost from "@/features/posts/components/CreatePost";
import PostsFeed from "@/features/posts/components/PostsFeed";

function HomePage() {
  return (
    <>
      <CreatePost />
      <PostsFeed />
    </>
  );
}

export default HomePage;

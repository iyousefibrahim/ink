import CreatePost from "@/features/posts/components/CreatePost";
import PostsFeed from "@/features/posts/components/PostsFeed";

function HomePage() {
  return (
    <main>
      <CreatePost />
      <PostsFeed />
    </main>
  );
}

export default HomePage;

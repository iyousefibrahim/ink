import PostSkeletion from "./PostSkeletion";
import usePosts from "../hooks/usePosts";
import ErrorPost from "./ErrorPost";
import EmptyPosts from "./EmptyPosts";
import PostItem from "./PostItem";

export default function PostsFeed() {
  const { data: posts, isPending, error } = usePosts();

  if (isPending) {
    return (
      <div className="flex flex-col items-center py-15 gap-10 ">
        {Array.from({ length: 3 }).map((_, index) => (
          <PostSkeletion key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorPost error={error} />;
  }

  return (
    <div className="flex flex-col items-center py-15 gap-10">
      {posts?.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}

      {posts?.length === 0 && <EmptyPosts />}
    </div>
  );
}

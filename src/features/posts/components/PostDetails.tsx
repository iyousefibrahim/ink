import { useParams } from "react-router";
import PostItem from "./PostItem";
import usePostById from "../hooks/usePostById";
import PostSkeletion from "./PostSkeletion";

function PostDetails() {
  const { id: postId } = useParams<{ id: string | undefined }>();
  const { data: post, error, isLoading } = usePostById(postId);

  if (isLoading) {
    return <PostSkeletion />;
  }
  if (error) {
    return <p className="text-center text-red-500">Failed to load post.</p>;
  }

  if (!post) {
    return <p className="text-center">Post not found.</p>;
  }

  return <PostItem post={post} />;
}

export default PostDetails;

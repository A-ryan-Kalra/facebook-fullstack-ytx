import Form from "@/components/Form";
import CommentFeed from "@/components/posts/CommentFeed";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";

function PostView() {
  const router = useRouter();
  const { postId } = router.query;
  const { data: fetchedPost, isLoading, mutate } = usePost(postId as string);
  // console.log(fetchedPost);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex h-full justify-center items-center">
        <ClipLoader size={80} className="" color="black" />
      </div>
    );
  }

  return (
    <div>
      <PostItem post={fetchedPost} />
      <Form isComment postId={postId as string} label="Write your views" />
      <CommentFeed comments={fetchedPost?.comments} />
    </div>
  );
}

export default PostView;

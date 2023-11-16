import usePosts from "@/hooks/usePosts";
import useUser from "@/hooks/useUser";
import React from "react";
import PostItem from "../posts/PostItem";

interface PostFeedProps {
  userId?: string;
}

function PostFeed({ userId }: PostFeedProps) {
  const { data: posts, mutate } = usePosts(userId as string);
  const { mutate: FetchedPostsMutate } = usePosts();
  //   console.log(posts);
  mutate();
  FetchedPostsMutate();
  return (
    <div className="flex flex-col gap-2 mt-2">
      {posts?.map((post: Record<string, any>, index: number) => (
        <PostItem post={post} key={index} userId={userId as string} />
      ))}
    </div>
  );
}

export default PostFeed;

import usePosts from "@/hooks/usePosts";
import useUser from "@/hooks/useUser";
import React, { useEffect } from "react";
import PostItem from "../posts/PostItem";
import useCurrentUser from "@/hooks/useCurrentUser";

interface PostFeedProps {
  userId?: string;
}

function PostFeed({ userId }: PostFeedProps) {
  const { data: posts, mutate } = usePosts(userId as string);
  const { data: post, mutate: FetchedPostsMutate } = usePosts();
  const { data: session } = useCurrentUser();

  //   console.log(posts);
  useEffect(() => {
    if (session) {
      mutate();
      FetchedPostsMutate();
    }
  }, [posts, post, mutate, FetchedPostsMutate]);
  return (
    <div className="flex flex-col gap-2 mt-2">
      {posts?.map((post: Record<string, any>, index: number) => (
        <PostItem post={post} key={index} userId={userId as string} />
      ))}
    </div>
  );
}

export default PostFeed;

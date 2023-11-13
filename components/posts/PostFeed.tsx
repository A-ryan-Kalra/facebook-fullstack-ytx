import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";
import { ClipLoader } from "react-spinners";
import usePost from "../../hooks/usePost";
function PostFeed() {
  const { data: posts, mutate, error, isLoading } = usePosts();
  return (
    <div>
      {!isLoading ? (
        <div className="flex flex-col gap-3 p-2">
          {posts?.map((post: Record<string, any>, index: number) => (
            <PostItem key={index} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex h-screen mt-20 justify-center">
          <ClipLoader color="black" size={80} />
        </div>
      )}
    </div>
  );
}

export default PostFeed;

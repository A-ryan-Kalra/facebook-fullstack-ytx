import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";
import { ClipLoader } from "react-spinners";
import usePost from "../../hooks/usePost";
import useCurrentUser from "@/hooks/useCurrentUser";
function PostFeed() {
  const { data: currentUser } = useCurrentUser();
  const { data: posts, mutate, error, isLoading } = usePosts();
  // console.log(isLoading);

  if (!currentUser) {
    return (
      <div className="flex flex-col h-screen mt-20 items-center">
        <div>
          <ClipLoader color="black" size={80} />
        </div>
        <h1 className="font-serif text-xl">Please login to continue</h1>
      </div>
    );
  }

  return (
    <div>
      {!isLoading ? (
        <div>
          {posts?.length !== 0 ? (
            <div className="flex flex-col gap-3 mt-2">
              {posts?.map((post: Record<string, any>, index: number) => (
                <PostItem key={index} post={post} />
              ))}
            </div>
          ) : (
            <h1 className="flex flex-col h-screen mt-20 items-center">
              Start following someone to stay updated.
            </h1>
          )}
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

import { useCallback, useMemo, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import useLoginModal from "./useLogin";
import toast from "react-hot-toast";
import axios from "axios";
import usePosts from "./usePosts";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const login = useLoginModal();
  // mutateFetchedPosts();
  // mutateFetchedPost();
  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      login.onOpen();
    }

    try {
      let request;
      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }
      await request();
      mutateFetchedPost();
      mutateCurrentUser();
      mutateFetchedPosts();
    } catch (error) {
      if (currentUser) toast.error("Something went wrong");
      console.log(error);
    }
  }, [
    currentUser,
    login,
    mutateCurrentUser,
    mutateFetchedPost,
    mutateFetchedPosts,
    postId,
    hasLiked,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;

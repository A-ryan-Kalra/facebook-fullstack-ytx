import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLogin";
import useUser from "./useUser";
import axios from "axios";
import toast from "react-hot-toast";
import usePosts from "./usePosts";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data, mutate: mutateFetchedUser } = useUser(userId);
  const { data: posts, mutate, error, isLoading } = usePosts();

  const login = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return login.onOpen();
    }
    try {
      let request;
      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }
      await request();
      mutateCurrentUser();
      mutateFetchedUser();
      mutate();
      toast.success(
        !isFollowing
          ? `you are following ${data?.name}`
          : `you are unfollowing ${data?.name}`
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }, [mutateCurrentUser, mutateFetchedUser, mutate, userId, isFollowing]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;

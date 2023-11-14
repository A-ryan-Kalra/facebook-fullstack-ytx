import { useCallback } from "react";
import usePost from "./usePost";
import usePosts from "./usePosts";
import toast from "react-hot-toast";
import axios from "axios";

const useDeleteComments = (commentsId: string, postId: string) => {
  const { data, mutate, isLoading } = usePost(postId);
  const { data: posts, mutate: postsMutate } = usePosts();
  //   console.log(data);
  //   console.log(posts);
  const delComments = useCallback(async () => {
    try {
      let request;
      request = () =>
        axios.delete("/api/deleteComments", { data: { commentsId } });
      await request();
      mutate();
      postsMutate();

      toast.success("Comment deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }, [mutate, postsMutate, commentsId]);

  return { delComments };
};

export default useDeleteComments;

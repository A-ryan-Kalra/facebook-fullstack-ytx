import fetcher from "@/libs/fetcher";
import useSWR from "swr";
import usePosts from "./usePosts";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import usePost from "./usePost";

const useDeletePost = (postId: string) => {
  const { data, mutate: FetchedPosts } = usePosts();
  const { mutate: FetchedPost } = usePost(postId);

  const delPost = useCallback(async () => {
    try {
      let request;

      request = () => axios.delete(`/api/delete`, { data: { postId } });
      await request();
      FetchedPosts();
      FetchedPost();
      toast.success("Post deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }, [FetchedPosts, postId]);
  return { delPost };
};

export default useDeletePost;

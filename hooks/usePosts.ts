import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    refreshInterval: 1000,
    revalidateOnMount: true,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;

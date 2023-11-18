import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher, {
    // refreshInterval: 1000,
    revalidateOnMount: true,
  });

  return { data, error, isLoading, mutate };
};

export default useCurrentUser;

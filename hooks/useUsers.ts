import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useUsers = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/users", fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
export default useUsers;

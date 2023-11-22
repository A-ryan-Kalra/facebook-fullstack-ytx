import usePosts from "@/hooks/usePosts";
import useUser from "@/hooks/useUser";
import useUsers from "@/hooks/useUsers";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import SearchBar from "../SearchBar";

function FollowBar() {
  const { data: users = [], mutate, isLoading } = useUsers();

  const router = useRouter();

  const goToUser = useCallback(
    (id: string) => {
      router.push(`/users/${id}`);
    },
    [router]
  );
  mutate();

  return (
    <div className="flex flex-col gap-14 ml-5 ">
      <SearchBar users={users} isLoading={isLoading} />

      <div className=" bg-gradient-to-br from-[#1777F2]/20 to-fuchsia-400/20 p-2 mt-2 hidden md:block rounded-xl h-max shadow-xl max-h-[280px] overflow-y-auto">
        <div>
          <h1 className="text-xl px-2 py-4 font-semibold cursor-default text-left">
            Who to Follow
          </h1>
          <div className="flex flex-col gap-4">
            {users?.map((user: any, index: number) => (
              <div
                key={index}
                className="flex gap-2 cursor-pointer hover:bg-white/30 hover:shadow-md duration-75 transition ease-in rounded-full"
                onClick={() => goToUser(user.id)}
              >
                <div className="relative w-10 h-10 rounded-full">
                  <Image
                    alt="dp"
                    className="rounded-full object-cover"
                    src={user?.profileImage || "/images/download.png"}
                    fill
                  />
                </div>
                <div className="flex-col flex">
                  <h1 className="font-semibold hover:underline">
                    {user?.name}
                  </h1>
                  <h1 className="text-zinc-500 text-[13px] hover:underline">
                    @{user?.username}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowBar;

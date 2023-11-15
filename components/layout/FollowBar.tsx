import usePosts from "@/hooks/usePosts";
import useUser from "@/hooks/useUser";
import useUsers from "@/hooks/useUsers";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

function FollowBar() {
  const { data: users = [], mutate } = useUsers();
  console.log(users);
  const router = useRouter();

  const goToUser = useCallback(
    (id: string) => {
      router.push(`/users/${id}`);
    },
    [router]
  );

  return (
    <div className="bg-black/10 p-2 mt-2 hidden md:block rounded-xl ml-10 h-max shadow-xl max-h-[280px] overflow-y-auto">
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
                  className="rounded-full"
                  src={user?.image || "/images/download.png"}
                  fill
                />
              </div>
              <div className="flex-col flex">
                <h1 className="font-semibold hover:underline">{user?.name}</h1>
                <h1 className="text-zinc-500 text-[13px] hover:underline">
                  @{user?.username}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FollowBar;

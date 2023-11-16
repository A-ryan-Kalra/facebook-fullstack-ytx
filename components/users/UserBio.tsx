import useCurrentUser from "@/hooks/useCurrentUser";
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import usePost from "@/hooks/usePost";
import useUser from "@/hooks/useUser";
import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/useEdit";

interface UserBioProps {
  userId: string;
}

function UserBio({ userId }: UserBioProps) {
  const { data: currentUser, error, isLoading, mutate } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const { isFollowing, toggleFollow } = useFollow(userId);
  // console.log(fetchedUser);
  const [type, setType] = useState("");
  const [type1, setType1] = useState(false);
  const editModal = useEditModal();

  const typeToFollow = useMemo(() => {
    isFollowing ? setType("following") : setType("follow");
    return type;
  }, [isFollowing, type]);

  return (
    <div className="pb-4 shadow-md rounded-b-xl mb-2 bg-white">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <button
            className="bg-[#fcfcfe] shadow-md rounded-lg hover:bg-opacity-5 active:scale-105 font-semibold  border-2 p-2"
            onClick={editModal.onOpen}
          >
            Edit
          </button>
        ) : (
          <button
            className={`${
              isFollowing
                ? `bg-black  hover:text-black hover:bg-red-200/20  border-0 text-white `
                : "bg-[#fcfcfe] hover:text-white"
            } shadow-md rounded-lg hover:bg-black/20 duration-100 transition ease-out active:scale-105 font-semibold p-2 `}
            onClick={toggleFollow}
            onMouseEnter={() => isFollowing && setType1(true)}
            onMouseLeave={() => {
              typeToFollow;
              setType1(false);
            }}
          >
            {type1 ? (
              <span className="text-red-500">unfollow</span>
            ) : (
              typeToFollow
            )}
          </button>
        )}
      </div>
      <div className="mt-8 flex flex-col gap-3 px-2">
        <div className="flex-col flex justify-center">
          <h1 className="text-[20px] ">{fetchedUser?.name}</h1>
          <h1 className="text-[16px] text-zinc-500 ">
            @{fetchedUser?.username}
          </h1>
        </div>
        <div className="flex  py-2 gap-3 items-center ">
          <Icon icon="solar:calendar-line-duotone" width={26} />
          <h1 className="text-zinc-600 text-[15px]">
            Joined {format(new Date(fetchedUser.createdAt), "MMMM yyyy")}
          </h1>
        </div>
        <div className="flex gap-5">
          <h1>
            <span className="mr-1">{fetchedUser?.followingIds?.length}</span>
            Following
          </h1>
          <h1>
            <span className="mr-1">{fetchedUser?.followersCount}</span>
            Followers
          </h1>
        </div>
      </div>
    </div>
  );
}

export default UserBio;

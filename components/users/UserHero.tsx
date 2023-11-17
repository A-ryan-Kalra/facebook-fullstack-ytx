import useUser from "@/hooks/useUser";
import Image from "next/image";
import React from "react";

interface UserHeroProps {
  userId: string;
}

function UserHero({ userId }: UserHeroProps) {
  const { data, error, isLoading, mutate } = useUser(userId);
  console.log(data);
  return (
    <div>
      <div className="bg-neutral-700 relative h-[40vh]">
        {data?.coverImage && (
          <Image
            alt="coverImage"
            src={data?.coverImage}
            fill
            className="object-cover items-end"
          />
        )}
        <div className="absolute left-4 border-2 border-[#1777F2] -bottom-16 rounded-full cursor-pointer bg-black">
          <div className=" relative w-32  h-32">
            {data?.profileImage && (
              <Image
                alt="display-profile"
                className="rounded-full object-cover"
                src={data?.profileImage}
                fill
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHero;

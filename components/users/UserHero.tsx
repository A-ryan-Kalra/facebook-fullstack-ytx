import useUser from "@/hooks/useUser";
import Image from "next/image";
import React from "react";

interface UserHeroProps {
  userId: string;
}

function UserHero({ userId }: UserHeroProps) {
  const { data, error, isLoading, mutate } = useUser(userId);
  // console.log(data);
  return (
    <div>
      <div className="bg-neutral-700 relative h-44">
        {data?.coverImage && (
          <Image
            alt="coverImage"
            src={data?.coverImage}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute left-4 border-2 border-[#1777F2] -bottom-16 rounded-full cursor-pointer bg-black">
          <div className=" relative w-32  h-32">
            {data?.image && (
              <Image
                alt="display-profile"
                className="rounded-full"
                src={data?.image}
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

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ClipLoader } from "react-spinners";

interface ProfileNameProps {
  profileName: Record<string, any>;
  isLoading: boolean;
  setProfileName: () => void;
  setSearchName: () => void;
}

function ProfileName({
  profileName,
  isLoading,
  setProfileName,
  setSearchName,
}: ProfileNameProps) {
  console.log(profileName);
  if (isLoading || !profileName) {
    return (
      <div className="bg-transparent absolute left-20 top-0 p-2 w-[240px]  flex flex-col  overflow-y-auto">
        <ClipLoader size={30} color="blue" />
      </div>
    );
  }
  return (
    <div>
      {profileName.length > 0 && (
        <div className="bg-white absolute left-5 z-10 top-11 rounded-md shadow-md p-2 w-[240px] gap-3 flex flex-col max-h-[150px] overflow-y-auto">
          {profileName.map((item: any, index: number) => (
            <Link
              href={`/users/${item?.id}`}
              className="flex items-center gap-2 hover:bg-blue-300 cursor-pointer rounded-md p-1"
              onClick={() => {
                setProfileName();
                setSearchName();
              }}
              key={index}
            >
              <div className="w-10 h-10 relative ">
                <Image
                  fill
                  className="object-cover rounded-full"
                  alt="image"
                  src={item?.profileImage}
                />
              </div>
              <h1 className="capitalize rounded-md p-1 font-semibold ">
                {item?.name}
              </h1>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileName;

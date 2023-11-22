import React, { ChangeEvent, useState } from "react";
import { Icon } from "@iconify/react";
import ProfileName from "./layout/ProfileName";

interface SearchbarProps {
  users: [];
  isLoading: boolean;
}

function SearchBar({ users, isLoading }: SearchbarProps) {
  let [profileName, setProfileName] = useState([]);
  let [searchName, setSearchName] = useState("");
  //   console.log(users);

  function search(searchName: string) {
    if (!searchName.trim()) {
      setProfileName([]);
    } else {
      setProfileName(
        users.filter((search: any) =>
          search.name.toLocaleLowerCase().includes(searchName)
        )
      );
    }
  }
  return (
    <div className="flex items-center mt-2  relative">
      <form>
        <div className="flex justify-between bg-white shadow-md rounded-full items-center">
          <input
            type="text"
            className=" rounded-full h-10  w-full bg-transparent p-2 text-[14px] focus:outline-none"
            placeholder="Search"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value.toLocaleLowerCase());
              search(e.target.value.toLocaleLowerCase());
            }}
          />
          <Icon
            icon="typcn:delete"
            width={25}
            className="hover:text-red-500 duration-100 transition active:scale-110 cursor-pointer"
            onClick={() => {
              setSearchName("");
              setProfileName([]);
            }}
          />
        </div>
        <ProfileName
          profileName={profileName}
          isLoading={isLoading}
          setProfileName={() => setProfileName([])}
          setSearchName={() => setSearchName("")}
        />
      </form>
    </div>
  );
}

export default SearchBar;

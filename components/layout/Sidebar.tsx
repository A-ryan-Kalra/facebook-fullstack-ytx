import React from "react";
import SidebarItem from "./SidebarItem";
import { Icon } from "@iconify/react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import useUsers from "@/hooks/useUsers";
import SearchBar from "../SearchBar";

function Sidebar() {
  const { data: session } = useCurrentUser();
  const { data: users = [], mutate, isLoading } = useUsers();

  const items = [
    {
      name: "Home",
      href: "/",
      icon: "ion:home",
    },
    {
      name: "Notifications",
      icon: "ion:notifications-sharp",
      href: "/notifications",
      alert: session?.hasNotification,
    },
    {
      name: "Profile",
      icon: "iconamoon:profile-circle-fill",
      href: `/users/${session?.id}`,
    },
  ];
  const router = useRouter();
  mutate();
  return (
    <div className="col-span-1 ">
      <div className="md:hidden justify-end flex ">
        <SearchBar users={users} isLoading={isLoading} />
      </div>
      <div className="gap-3 flex flex-col w-max ml-auto">
        <Icon
          onClick={() => router.push("/")}
          icon="logos:facebook"
          className="active:scale-105 cursor-pointer shadow-md bg-[#FEFEFF] rounded-full mt-2 p-2 w-[53px] h-[53px] md:w-[64px]  md:h-[64px]"
        />
        {items.map((item, index: number) => (
          <SidebarItem
            key={index}
            name={item.name}
            icon={item.icon}
            href={item.href}
            alert={item.alert}
          />
        ))}
        {session && (
          <SidebarItem
            name={"Logout"}
            icon={"material-symbols:logout-rounded"}
            onClick={() => {
              signOut();
            }}
            rotate={2}
          />
        )}
      </div>
    </div>
  );
}

export default Sidebar;

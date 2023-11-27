import React from "react";
import SidebarItem from "./SidebarItem";
import { Icon } from "@iconify/react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import useUsers from "@/hooks/useUsers";
import SearchBar from "../SearchBar";
import Image from "next/image";

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
    <div className="col-span-1 sticky top-0">
      <div className="md:hidden justify-end flex ">
        <SearchBar users={users} isLoading={isLoading} />
      </div>
      <div className="gap-3 flex flex-col w-max ml-auto">
        <div className="relative w-[53px] mt-2 rounded-full h-[53px] md:w-[74px]  md:h-[74px]">
          <Image
            onClick={() => router.push("/")}
            alt="image"
            src={"/images/myhub.png"}
            className="active:scale-105 cursor-pointer shadow-md bg-gradient-to-br rounded-full "
            fill
          />
        </div>
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

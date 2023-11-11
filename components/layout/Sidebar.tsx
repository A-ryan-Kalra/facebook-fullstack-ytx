import React from "react";
import SidebarItem from "./SidebarItem";
import { Icon } from "@iconify/react";
import { signOut } from "next-auth/react";

function Sidebar() {
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
    },
    {
      name: "Profile",
      icon: "iconamoon:profile-circle-fill",
      href: "/users",
    },
  ];
  return (
    <div className="col-span-1 border-r-[1px] border-zinc-300 ">
      <div className="gap-3 flex flex-col w-max ml-auto">
        <Icon
          icon="logos:facebook"
          className="active:scale-105 cursor-pointer shadow-md bg-[#FEFEFF] rounded-full mt-2 p-2 w-[53px] h-[53px] md:w-[64px]  md:h-[64px]"
        />
        {items.map((item, index: number) => (
          <SidebarItem
            key={index}
            name={item.name}
            icon={item.icon}
            href={item.href}
          />
        ))}
        <SidebarItem
          name={"Logout"}
          icon={"material-symbols:logout-rounded"}
          onClick={() => {
            signOut();
          }}
          rotate={2}
        />
      </div>
    </div>
  );
}

export default Sidebar;

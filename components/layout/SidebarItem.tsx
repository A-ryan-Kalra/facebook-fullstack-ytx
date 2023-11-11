import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import useRegisterModal from "@/hooks/useRegister";

interface SidebarItemProps {
  href?: string;
  name: string;
  icon: string;
  rotate?: number;
  onClick?: () => void;
}
function SidebarItem({ href, name, icon, onClick, rotate }: SidebarItemProps) {
  const router = useRouter();
  const register = useRegisterModal();

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
    register.onOpen();
    router.push(`/${href}`);
  };

  return (
    <div
      className=" cursor-pointer transition duration-100 hover:bg-neutral-200 rounded-full px-3 py-2"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2 ">
        <Icon icon={icon} width={30} color="#0865FC" rotate={rotate} />
        <h1 className="text-[23px] md:inline hidden text-center">{name}</h1>
      </div>
    </div>
  );
}

export default SidebarItem;

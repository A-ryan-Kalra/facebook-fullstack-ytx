import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLogin";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  href?: string;
  name: string;
  icon: string;
  rotate?: number;
  onClick?: () => void;
  alert?: boolean;
}
function SidebarItem({
  href,
  name,
  icon,
  onClick,
  rotate,
  alert,
}: SidebarItemProps) {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const login = useLoginModal();

  const { data: posts, mutate: postsMutate } = usePosts();

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
    if (!currentUser) {
      login.onOpen();
    } else if (href) {
      // postsMutate();
      router.push(href as string);
    }
  };

  return (
    <div
      className=" cursor-pointer relative transition duration-100 hover:bg-neutral-200 rounded-full px-3 py-2"
      onClick={handleClick}
    >
      <div className="flex relative items-center gap-2 ">
        <Icon icon={icon} width={30} color="#0865FC" rotate={rotate} />
        {alert ? (
          <Icon
            icon="ph:dot-duotone"
            className="absolute left-0 text-fuchsia-900 -top-4"
            width={50}
          />
        ) : null}
        <h1 className="text-[23px] md:inline hidden text-center">{name}</h1>
        {alert ? (
          <Icon
            icon="mdi:dot"
            className="absolute text-fuchsia-500 left-0 -top-4"
            width={50}
          />
        ) : null}
      </div>
    </div>
  );
}

export default SidebarItem;

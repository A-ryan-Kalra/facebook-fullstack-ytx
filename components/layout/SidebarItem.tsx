import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLogin";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";

interface SidebarItemProps {
  href?: string;
  name: string;
  icon: string;
  rotate?: number;
  onClick?: () => void;
}
function SidebarItem({ href, name, icon, onClick, rotate }: SidebarItemProps) {
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

import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { Icon } from "@iconify/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import LoginModal from "../modals/LoginModal";
import useLoginModal from "@/hooks/useLogin";
import usePost from "../../hooks/usePost";
import useLike from "@/hooks/useLike";

interface PostItemProps {
  post: Record<string, any>;
}
function PostItem({ post }: PostItemProps) {
  console.log(post);
  const login = useLoginModal();
  //   const { data } = usePost(post.id);
  const { data: currentUser, isLoading, mutate } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: post?.id });
  const router = useRouter();

  const goToUser = useCallback(() => {
    router.push(`/users/${post.user.id}`);
  }, [router]);

  //   const goToPost = useCallback(() => {
  //     router.push(`/posts/${post.user.id}`);
  //   }, [router]);
  console.log(hasLiked);
  const onLike = useCallback(() => {
    if (!currentUser) {
      login.onOpen();
    }
    toggleLike();
  }, [currentUser, login, toggleLike]);

  return (
    <div
      className="bg-[#FEFEFF] flex flex-col rounded-md shadow-md p-2"
      onClick={onLike}
    >
      <div className="flex gap-2">
        <div className="relative w-10 rounded-full h-10">
          <Image
            alt="display-profile"
            className="rounded-full"
            fill
            src={"/images/download.png"}
          />
        </div>
        <div className="flex-col flex text-[15px]">
          <h1
            className="capitalize font-bold hover:underline cursor-pointer"
            onClick={goToUser}
          >
            {post?.user?.name}
          </h1>
          <h1 className="font-light text-[13px] text-zinc-600 hover:underline cursor-default">
            {formatDistanceToNow(new Date(post.createdAt))}
          </h1>
        </div>
      </div>
      <p className="p-2">{post?.body}</p>
      <div className="flex gap-5 items-center">
        <div className="border-2 p-1 rounded-full cursor-pointer hover:bg-neutral-500/20 active:scale-110">
          {hasLiked ? (
            <Icon icon="solar:like-bold-duotone" width={20} onClick={onLike} />
          ) : (
            <Icon icon="solar:like-broken" width={20} onClick={onLike} />
          )}
        </div>
        <span className="text-black -ml-4">{post?.likedIds?.length}</span>
        <div className="border-2 p-1 rounded-full cursor-pointer hover:bg-neutral-500/20 active:scale-110">
          <Icon icon="iconamoon:comment-bold" width={20} />
        </div>
      </div>
    </div>
  );
}

export default PostItem;

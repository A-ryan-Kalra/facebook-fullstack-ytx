import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import LoginModal from "../modals/LoginModal";
import useLoginModal from "@/hooks/useLogin";
import usePost from "../../hooks/usePost";
import useLike from "@/hooks/useLike";
import useDeletePost from "@/hooks/useDeletePost";
import fetcher from "@/libs/fetcher";

interface PostItemProps {
  post: Record<string, any>;
  userId?: string;
}
function PostItem({ post }: PostItemProps) {
  const login = useLoginModal();

  const { data: currentUser, isLoading, mutate } = useCurrentUser();

  const { hasLiked, toggleLike } = useLike({ postId: post?.id });
  const { delPost } = useDeletePost(post?.id);
  const router = useRouter();
  const [liked, setLiked] = useState(hasLiked);
  // console.log(!currentUser);

  useEffect(() => {
    setLiked(hasLiked);
  }, [hasLiked, setLiked]);

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();

      router.push(`/users/${post?.user?.id}`);
    },
    [router, post?.user?.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${post?.id}`);
  }, [router, post?.id]);

  const onLike = useCallback(
    (ev: any) => {
      ev.stopPropagation();
      // if (liked) {
      //   setLiked(false);
      // } else {
      //   setLiked(true);
      // }
      setLiked(!liked);
      if (!currentUser) {
        return login.onOpen();
      }
      toggleLike();
    },
    [currentUser, login, toggleLike, liked, setLiked]
  );

  const onDeletePost = useCallback(
    (ev: any) => {
      ev.stopPropagation();

      delPost();
    },
    [delPost]
  );
  // console.log(post);
  return (
    <div
      className="bg-[#FEFEFF] flex flex-col rounded-lg hover:bg-opacity-20 cursor-pointer shadow-md p-2"
      onClick={goToPost}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div
            className="relative w-10 rounded-full h-10 cursor-pointer"
            onClick={goToUser}
          >
            <Image
              alt="display-profile"
              className="rounded-full"
              fill
              src={post?.user?.profileImage || "/images/download.png"}
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
        {post?.user?.id === currentUser?.id && (
          <div
            className="border-2 p-1 rounded-full cursor-pointer hover:bg-red-500/40 text-red-500 active:scale-110"
            onClick={onDeletePost}
          >
            <Icon icon="material-symbols:delete" width={25} />
          </div>
        )}
      </div>
      <p className="p-2 ">{post?.body}</p>
      {post?.image && (
        <div className="relative w-full  mb-2 h-[300px] px-2 py-4">
          <Image
            fill
            alt="body-image"
            src={post?.image}
            className="object-cover  rounded-xl p-1"
          />
        </div>
      )}
      <div className="flex gap-5 items-center">
        <div className="border-2 p-1 rounded-full cursor-pointer hover:bg-neutral-500/20 active:scale-110">
          {currentUser && liked ? (
            <Icon icon="solar:like-bold-duotone" width={20} onClick={onLike} />
          ) : (
            <Icon icon="solar:like-broken" width={20} onClick={onLike} />
          )}
        </div>
        <span className="text-black -ml-4">{post?.likedIds?.length}</span>
        <div className="border-2 p-1 rounded-full cursor-pointer hover:bg-neutral-500/20 active:scale-110">
          <Icon icon="iconamoon:comment-bold" width={20} />
        </div>
        <span className="text-black -ml-4">{post?.comments?.length || 0}</span>
      </div>
    </div>
  );
}

export default PostItem;

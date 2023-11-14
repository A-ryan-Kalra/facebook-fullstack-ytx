import useDeleteComments from "@/hooks/useDeleteComment";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { Icon } from "@iconify/react";
import useCurrentUser from "@/hooks/useCurrentUser";

interface CommentItemProps {
  data: Record<string, any>;
}
function CommentItem({ data }: CommentItemProps) {
  //   const { data: fetchedUser } = useUser(userId);
  //   console.log(data);

  const router = useRouter();
  const { delComments } = useDeleteComments(data.id, data.postId);
  const { data: currentUser } = useCurrentUser();
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data?.createdAt]);

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();

      router.push(`/users/${data?.user?.id}`);
    },
    [router, data?.user?.id]
  );
  const onDeletePost = useCallback(
    (ev: any) => {
      ev.stopPropagation();

      delComments();
    },
    [delComments]
  );
  return (
    <div className="bg-[#FEFEFF] shadow-md flex flex-col gap-2 rounded-md p-2">
      <div className="flex justify-between p-1">
        <div className="flex gap-2">
          <div
            className="relative w-10 h-10 rounded-full  cursor-pointer"
            onClick={goToUser}
          >
            <Image
              fill
              alt="dp"
              className="rounded-full"
              src={"/images/download.png"}
            />
          </div>
          <div className="flex flex-col">
            <h1
              onClick={goToUser}
              className="capitalize hover:underline cursor-pointer font-semibold"
            >
              {data?.user?.name}
            </h1>
            <h2 className=" hover:underline text-[12px] font-normal text-zinc-500">
              {createdAt}
            </h2>
          </div>
        </div>
        {data?.user?.id === currentUser?.id && (
          <div
            className="border-2 p-1 rounded-full items-center flex cursor-pointer hover:bg-red-500/40 text-red-500 active:scale-110"
            onClick={onDeletePost}
          >
            <Icon icon="material-symbols:delete" width={25} />
          </div>
        )}
      </div>
      <p>{data?.body}</p>
    </div>
  );
}

export default CommentItem;

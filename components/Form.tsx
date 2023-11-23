import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import RegisterModal from "./modals/RegisterModal";
import useRegisterModal from "@/hooks/useRegister";
import useLoginModal from "@/hooks/useLogin";
import toast from "react-hot-toast";
import axios from "axios";
import usePosts from "@/hooks/usePosts";
import { mutate } from "swr";
import usePost from "@/hooks/usePost";
import ImageUpload from "./ImageUpload";
import ImagePostUpload, { uploadAtom1, uploadAtom2 } from "./ImagePostUpload";
import { atom, useAtom } from "jotai";

interface FormProps {
  label: string;
  isComment?: boolean;
  postId?: string;
}
export const postUpload = atom(false);
function Form({ label, isComment, postId }: FormProps) {
  const { data: session } = useCurrentUser();
  const register = useRegisterModal();
  const login = useLoginModal();
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [postImage, setPostImage] = useState("");
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);
  const [upload, setUpload] = useAtom(uploadAtom1);
  const [disabled1, setDisabled1] = useAtom(postUpload);
  const [imageUploaded, setImageUploaded] = useAtom(uploadAtom2);
  // console.log(upload);
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

      await axios.post(url, { body, postImage });

      toast.success("Posted");
      setBody("");
      setUpload(true);
      setImageUploaded(false);

      mutatePosts();
      mutatePost();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      // setUpload(true);
      setDisabled1(true);
    }
  }, [body, mutatePosts, mutatePost, postId, isComment, postImage]);

  return (
    <div className="bg-[#FEFEFF] shadow-lg rounded-xl mt-2 p-2">
      {session ? (
        <div className="flex flex-col gap-2">
          <div className="flex  gap-2">
            <div className="relative w-12 h-11  rounded-full">
              <Image
                className="rounded-full cursor-pointer object-cover"
                alt="prifile-pic"
                src={session?.profileImage || "/images/download.png"}
                fill
              />
            </div>

            <textarea
              className="min-h-[70px] resize-none w-full bg-[#F1F3F5] rounded-md p-3 cursor-pointer outline-none hover:bg-neutral-200 peer"
              value={body}
              placeholder={label}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div
            className={`flex ${
              isComment ? "justify-end items-end" : "justify-between items-end"
            }   `}
          >
            {!isComment && (
              <ImagePostUpload
                disabled={disabled1}
                onChange={(image) => setPostImage(image)}
              />
            )}
            <button
              className="bg-[#1777F2] focus:outline-none active:scale-105 text-white font-semibold px-3 py-2 shadow-md hover:bg-opacity-80 rounded-full disabled:cursor-not-allowed disabled:bg-zinc-400 disabled:active:scale-100"
              onClick={onSubmit}
              disabled={
                isComment
                  ? isLoading || !body.trim()
                  : imageUploaded
                  ? false
                  : isLoading || upload || !body.trim()
              }
            >
              Post
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <button
            className="bg-[#1777F2] hover:bg-opacity-80 shadow-md text-white px-3 py-2 rounded-full"
            onClick={() => register.onOpen()}
          >
            Register
          </button>
          <button
            className="bg-[#e8e853] hover:bg-opacity-80 shadow-md text-black px-3 py-2 rounded-full"
            onClick={() => login.onOpen()}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}

export default Form;

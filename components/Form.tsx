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

interface FormProps {
  label: string;
}
function Form({ label }: FormProps) {
  const { data: session } = useCurrentUser();
  const register = useRegisterModal();
  const login = useLoginModal();
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: mutatePosts } = usePosts();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = "/api/posts";

      await axios.post(url, { body });

      toast.success("Posted");
      setBody("");
      mutatePosts();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  return (
    <div className="bg-[#FEFEFF] shadow-lg rounded-xl mt-2 p-2">
      {session ? (
        <div className="flex flex-col gap-2">
          <div className="flex  gap-2">
            <div className="relative w-12 h-11  rounded-full">
              <Image
                className="rounded-full cursor-pointer object-cover"
                alt="prifile-pic"
                src={"/images/download.png"}
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
          <div className="flex justify-end items-end ">
            <button
              className="bg-[#1777F2] focus:outline-none active:scale-105 text-white font-semibold px-3 py-2 shadow-md hover:bg-opacity-80 rounded-full disabled:cursor-not-allowed disabled:bg-zinc-400 disabled:active:scale-100"
              onClick={onSubmit}
              disabled={isLoading || !body.trim()}
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

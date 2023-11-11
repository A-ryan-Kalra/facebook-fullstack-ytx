import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import React from "react";
import RegisterModal from "./modals/RegisterModal";
import useRegisterModal from "@/hooks/useRegister";
import useLoginModal from "@/hooks/useLogin";

interface FormProps {
  label: string;
}
function Form({ label }: FormProps) {
  const { data: session } = useCurrentUser();
  const register = useRegisterModal();
  const login = useLoginModal();

  return (
    <div className="bg-[#FEFEFF] shadow-lg rounded-xl mt-2 p-2">
      {session ? (
        <div className="flex gap-2">
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
            placeholder={label}
          />
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

import React from "react";
import { Icon } from "@iconify/react";

function Modal() {
  return (
    <div className="fixed bg-black/20  inset-0 z-50">
      <div className="relative top-[27%] flex-col flex m-auto translate-y-[-27%]  px-10 py-5 gap-3  bg-black max-w-3xl w-3/6">
        <div className="flex justify-between items-center p-2">
          <h1 className="text-white text-[30px] font-semibold">Login</h1>
          <Icon
            icon="jam:close"
            width={40}
            className="text-white cursor-pointer rounded-full hover:bg-white/30 transition duration-100"
          />
        </div>
        <form className="flex flex-col gap-5 px-5  py-3">
          <input
            type="text"
            className="h-[60px] focus:outline-none p-2 focus:ring-[2px] rounded-md ring-blue-500 focus:border-none border-zinc-600 border-2 bg-transparent text-white"
            placeholder="Email"
          />
          <input
            type="text"
            className="h-[60px] focus:outline-none p-2 focus:ring-[2px] rounded-md ring-blue-500 focus:border-none border-zinc-600 border-2 bg-transparent text-white"
            placeholder="Password"
          />
          <button className="text-xl font-semibold hover:bg-white/80 mt-10 bg-white rounded-full p-2">
            Sign in
          </button>
        </form>
        <h2 className="text-zinc-400 text-center">
          First time using Facebook?
          <span className="text-white hover:underline cursor-pointer ml-1">
            Create an account
          </span>
        </h2>
      </div>
    </div>
  );
}

export default Modal;

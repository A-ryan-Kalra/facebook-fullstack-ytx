import Image from "next/image";
import React from "react";

interface FormProps {
  label: string;
}
function Form({ label }: FormProps) {
  return (
    <div className="bg-[#FEFEFF] shadow-lg rounded-xl mt-2 p-2">
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
    </div>
  );
}

export default Form;

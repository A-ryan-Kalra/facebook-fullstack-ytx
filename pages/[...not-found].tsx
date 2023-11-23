import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center flex-col gap-3 items-center h-screen">
      <div className="w-32 h-32 relative">
        <Image alt="error" src={"/images/link.svg" || ""} fill />
      </div>
      <p className="text-[20px]">Could not find requested link.</p>
      <Link
        href="/"
        className="bg-[#0765FC] text-white p-2 rounded-full shadow-md"
      >
        Go back home
      </Link>
    </div>
  );
}

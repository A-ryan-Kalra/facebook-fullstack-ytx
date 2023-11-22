import React, { ReactNode } from "react";
import Sidebar from "./layout/Sidebar";
import FollowBar from "./layout/FollowBar";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="grid grid-cols-4 h-screen mx-auto max-w-6xl ">
        <Sidebar />
        <div className="col-span-3 md:col-span-2 max-md:p-2">{children}</div>
        <FollowBar />
      </div>
    </div>
  );
}

export default Layout;

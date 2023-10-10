import React from "react";
import Notification from "../components/notification";
import BtnBack from "../components/btn-back";
export const dynamic = "force-dynamic";
const page = () => {
  return (
    <div className="flex top-0 bottom-0 flex-col w-screen fixed bg-white dark:bg-black z-50">
      <header className="name">
        <BtnBack />
      </header>
      <div className="flex justify-center w-full h-full max-w-[500px] m-auto">
        <Notification />
      </div>
    </div>
  );
};

export default page;

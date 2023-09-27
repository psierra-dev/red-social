import React from "react";
import Notification from "../components/notification";
import BtnBack from "../components/btn-back";

const page = () => {
  return (
    <div className=" w-screen h-screen fixed bg-white z-50">
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

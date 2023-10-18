"use client";
import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import OptionMenu from "./option-menu";

const BtnMenu = () => {
  const [showOption, setShowOption] = useState(false);
  return (
    <div className="hidden md:block md:relative">
      {showOption && <OptionMenu style="absolute left-[4px] top-[-111px]" />}
      <button className=" text-3xl" onClick={() => setShowOption(!showOption)}>
        <BiMenu />
      </button>
    </div>
  );
};

export default BtnMenu;

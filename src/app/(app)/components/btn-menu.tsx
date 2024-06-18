"use client";
import React, { useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import OptionMenu from "./option-menu";
import ClickOutside from "@/app/components/click-outside";

const BtnMenu = () => {
  const [showOption, setShowOption] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="hidden md:block md:relative">
      {showOption && <ClickOutside onClose={(event) => {
              if (
                buttonRef.current &&
                !buttonRef.current.contains(event?.target as Node)
              ) {
                setShowOption(false);
              }
            }}><OptionMenu style="absolute left-[4px] top-[-111px]" /></ClickOutside>}
      <button ref={buttonRef} className=" text-3xl" onClick={() => setShowOption(!showOption)}>
        <BiMenu />
      </button>
    </div>
  );
};

export default BtnMenu;

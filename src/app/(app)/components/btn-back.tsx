"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

const BtnBack = () => {
  const router = useRouter();
  return (
    <div className="m-2 text-2xl cursor-pointer" onClick={() => router.back()}>
      <BiArrowBack />
    </div>
  );
};

export default BtnBack;

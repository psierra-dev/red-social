"use client";
import React from "react";
import { BiX } from "react-icons/bi";

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: any;
}) => {
  return (
    <div
      className="relative z-40"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed  inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex relative min-h-full justify-center  text-center items-center">
          <button className="absolute top-10 right-10 z-11" onClick={onClose}>
            <BiX />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

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
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed  inset-0 bg-zinc-900/75 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex relative min-h-full justify-center  text-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

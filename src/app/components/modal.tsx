"use client";
import React, {ElementRef, useEffect, useRef} from "react";

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: any;
}) => {
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      document.body.classList.add("modal-active");
    }

    return () => {
      document.body.classList.remove("modal-active");
    };
  }, []);

  return (
    <div className="relative z-50" aria-labelledby="modal-title">
      <div className="fixed  inset-0 bg-zinc-900/75 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <dialog
          ref={dialogRef}
          className="flex relative w-full bg-transparent min-h-full justify-center  text-center items-center"
          onClose={onClose}
        >
          {children}
        </dialog>
      </div>
    </div>
  );
};

export default Modal;

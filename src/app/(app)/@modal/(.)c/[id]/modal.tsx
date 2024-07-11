"use client";

import {type ElementRef, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import {createPortal} from "react-dom";
import {BiX} from "react-icons/bi";

export function Modal({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      document.body.classList.add("modal-active");
    }
  }, []);

  function onDismiss() {
    document.body.classList.remove("modal-active");
    router.back();
  }

  return createPortal(
    <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center z-50">
      <dialog
        ref={dialogRef}
        className="w-full h-full flex justify-center items-center bg-transparent"
        onClose={onDismiss}
      >
        {children}
        <button
          onClick={onDismiss}
          className="text-4xl bg-transparent text-white fixed top-3 right-3"
        >
          <BiX />
        </button>
      </dialog>
    </div>,
    document.getElementById("modal-root")!
  );
}

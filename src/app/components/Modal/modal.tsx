"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { BiX } from "react-icons/bi";

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    overlay.current || wrapper.current
      ? document.body.classList.add("modal-active")
      : document.body.classList.remove("modal-active");

    return () => document.body.classList.remove("modal-active");
  }, [overlay.current || wrapper.current]);
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed z-50 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] max-h-[600px]  md:max-h-[1000px] md:h-[90%] sm:w-10/12 md:w-8/12 lg:w-1/2 p-2 flex flex-col"
      >
        <div className="p-2 w-full bg-white ">
          <button onClick={() => onDismiss()} className="text-xl">
            <BiX />
          </button>
        </div>
        <div className="flex overflow-y-auto" style={{ height: "inherit" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

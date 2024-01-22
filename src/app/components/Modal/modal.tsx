"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

export default function Modal({
  children,
  type,
  onClose,
}: {
  children: React.ReactNode;
  type: "route" | "state";
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    if (type === "state" && onClose) {
      console.log("aqui");

      return;
    }
    router.back();
  }, [router, onClose, type]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (
        (e.target === overlay.current || e.target === wrapper.current) &&
        type === "route"
      ) {
        if (onDismiss) onDismiss();
      }

      if (onClose) {
        onClose(e as React.MouseEvent<HTMLButtonElement, MouseEvent>);
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
      className="fixed z-50 left-0 right-0 top-0 bottom-0 mx-auto bg-zinc-950"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
      >
        {children}
      </div>
    </div>
  );
}

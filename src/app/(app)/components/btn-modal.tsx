"use client";
import Modal from "@/app/components/modal";
import React, { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import FormPost from "./form-post";

const ButtonPost = () => {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    modal
      ? document.body.classList.add("modal-active")
      : document.body.classList.remove("modal-active");

    return () => document.body.classList.remove("modal-active");
  }, [modal]);
  return (
    <div className="p-2 hover:bg-[#80808056] rounded-md flex items-center justify-center">
      <button onClick={() => setModal(true)}>
        <BiPlusCircle />
      </button>
      {modal ? (
        <Modal onClose={() => setModal(false)}>
          <FormPost onCloseModal={() => setModal(false)} />
        </Modal>
      ) : null}
    </div>
  );
};

export default ButtonPost;

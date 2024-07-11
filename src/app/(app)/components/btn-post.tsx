"use client";
import Modal from "@/app/components/modal";
import React, {useState} from "react";
import {BiPlusCircle} from "react-icons/bi";
import FormPost from "./form-post";
import {createPortal} from "react-dom";

const ButtonPost = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="p-2 hover:bg-[#80808056] rounded-md flex items-center justify-center">
        <button onClick={() => setModal(true)}>
          <BiPlusCircle />
        </button>
      </div>

      {modal &&
        createPortal(
          <Modal onClose={() => setModal(false)}>
            <FormPost onCloseModal={() => setModal(false)} />
          </Modal>,
          document.getElementById("modal-root")!
        )}
    </>
  );
};

export default ButtonPost;

"use client";
import Modal from "@/app/components/modal";
import React, { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import FormPost from "./form-post";

const ButtonModal = () => {
  const [modal, setModal] = useState(false);
  return (
    <div className="p-2 hover:bg-[#80808056] rounded-md flex items-center justify-center">
      <button onClick={() => setModal(true)}>
        <BiPlusCircle />
      </button>
      {modal ? (
        <Modal onClose={() => setModal(false)}>
          <FormPost />
        </Modal>
      ) : null}
    </div>
  );
};

export default ButtonModal;

"use client";
import Modal from "@/app/components/modal";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Search from "./search";

const ButtonSearch = () => {
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
        <BiSearch />
      </button>
      {modal ? (
        <Modal onClose={() => setModal(false)}>
          <Search onClose={() => setModal(false)} />
        </Modal>
      ) : null}
    </div>
  );
};

export default ButtonSearch;

"use client";
import ClickOutside from "@/app/components/click-outside";
import Modal from "@/app/components/modal";
import { createClient } from "@/app/utils/supabase/client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { BiDotsHorizontalRounded, BiPencil, BiTrash } from "react-icons/bi";

const OptionPost = ({ postId }: { postId: number }) => {
  const [option, setOption] = useState(false);
  const [modal, setModal] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleDelete = async () => {
    //const {data: {user}} = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);
    
    if (error === null) {
      router.refresh();
      setModal(false);
    }
  };
  return (
    <div className="relative dark:bg-black">
      <button
        ref={buttonRef}
        className=" items-start text-2xl"
        onClick={() => setOption(!option)}
      >
        <BiDotsHorizontalRounded />
      </button>
      {option && (
        <ClickOutside
          onClose={(event) => {
            if (
              buttonRef.current &&
              !buttonRef.current.contains(event?.target as Node)
            ) {
              setOption(false);
            }
          }}
        >
          <div className="bg-white dark:bg-black w-[300px] p-3 top-10 absolute z-10 right-2 rounded-xl shadow-t-xl">
            <ul>
              <li>
                <div className="flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-[#3838383b]">
                  <span className="text-xl">
                    <BiPencil />
                  </span>
                  <p>Editar posteo</p>
                </div>
              </li>
              <li>
                <div
                  className="flex items-center gap-2 p-2 text-sm text-red-600 cursor-pointer hover:bg-[#38383842] "
                  onClick={() => {
                    setOption(false);
                    setModal(true);
                  }}
                >
                  <span className="text-xl">
                    <BiTrash />
                  </span>
                  <p>Eliminar posteo</p>
                </div>
              </li>
            </ul>
          </div>
        </ClickOutside>
      )}

      {modal && (
        <Modal onClose={() => setModal(false)}>
          <div className="min-w-[400px] bg-white dark:bg-black rounded-xl">
            <header className=" border-b-2">
              <h3 className="text-center m-2">Â¿Quieres borrar este post?</h3>
            </header>

            <div className="p-3 gap-2">
              <div>
                <p className="text-sm text-start font-thin">
                  El post se eliminara permanentemente
                </p>
              </div>

              <div className="flex justify-end mt-3">
                <button
                  className="p-2 px-4 text-sm rounded-lg"
                  onClick={() => setModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="p-2 px-4 text-sm rounded-lg bg-red-500 text-white"
                  onClick={handleDelete}
                >
                  Borrar
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OptionPost;
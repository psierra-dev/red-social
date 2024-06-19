"use client";

import EmojiPicker from "@/app/components/emoji-picker";
import React, { useRef, useState } from "react";
import { BiHappy, BiImage, BiLoaderAlt, BiX } from "react-icons/bi";
import { useRouter } from "next/navigation";
import useLoadImage from "@/app/hooks/useLoadImage";
import PostService from "@/app/services/post";
import Loader from "@/app/components/loader";
import { MdOutlineCameraAlt } from "react-icons/md";
import Image from "next/image";
import { createClient } from "@/app/utils/supabase/client";
import ClickOutside from "@/app/components/click-outside";


const FormPost = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const [text, setText] = useState("");
  const { handleChangeFile, file, selectedImage } = useLoadImage("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [status, setStatus] = useState<
    "typing" | "loading" | "success" | "error"
  >("typing");

  const inputImage = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  const supabase = createClient()
  const postService = new PostService(supabase);

  const isMaxLength = 70 > text.length;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setStatus("loading");

    if (file !== null) {
      const { error: errorPost } = await postService.add(text, file);
      if (errorPost === null) {
        router.refresh();
        onCloseModal();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } else {
      setStatus("error");
    }
  };

  const insertEmoji = (emoji: string) => {
    if (inputRef.current) {
      const { selectionStart, selectionEnd } = inputRef.current;
      if (selectionStart !== null && selectionEnd !== null) {
        const comment =
          text.slice(0, selectionStart) + emoji + text.slice(selectionEnd);
        if(!isMaxLength) return
        setText(comment);

        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = selectionStart + emoji.length;
            inputRef.current.selectionEnd = selectionStart + emoji.length;
          }
        }, 0);
        inputRef?.current?.focus();
      }
    }
  };

  return (
    <div className="relative bg-white dark:bg-black h-screen flex sm:max-h-[740px] p-2 w-full max-w-[500px]  sm:rounded-lg">
      {status === "loading" && (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-[#000000b4] z-20 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <BiLoaderAlt className="animate-spin h-5 w-5 mb-3" />

            <p className="text-xs  text-white">Posteando</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col ">
        <header className="flex w-full justify-between ">
          <button className="" onClick={onCloseModal}>
            <BiX />
          </button>
          <button
            type="submit"
            disabled={!file}
            className=" disabled:text-sky-300 disabled:cursor-not-allowed cursor-pointer text-xs md:text-sm text-sky-600"
          >
            Publicar
          </button>
        </header>
        <div className="flex flex-col flex-1  gap-6 overflow-auto">
          <div className=" flex flex-col relative w-full">
            
            <textarea
              ref={inputRef}
              value={text}
              name="content"
              id=""
              onChange={(e) => {
                if(!isMaxLength) return
                setText(e.target.value)
              }}
              placeholder="Que estas pensando?"
              className="w-full h-[100px]  p-3 my-2 text-sm grow focus:outline-none bg-transparent placeholder:text-sm"
              autoFocus={true}
              style={{}}
            />
            <div className=" hidden sm:flex relative  justify-between">
            <div className="flex items-center text-[11px]">
              <span>{text.length}</span>
              /
              <span>70</span>
            </div>
            <div>
              <button
                className="self-end text-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setShowEmoji(true);
                  inputRef?.current?.focus()
                }}
              >
                <BiHappy />
              </button>
              {showEmoji && (
                <ClickOutside onClose={() => setShowEmoji(false)}>
                  <div className="absolute top-[30px] right-[0]">
                    <EmojiPicker onSelect={(emoji) => insertEmoji(emoji)} />
                  </div>
                </ClickOutside>
              )}
            </div>
            </div>
          </div>
          <div className="flex flex-1 overflow-auto flex-col w-full ">
            {selectedImage ? (
              <div className="flex flex-1 overflow justify-center w-full ">
                <div className=" flex justify-center items-center overflow w-[90%]">
                  <Image
                    src={selectedImage}
                    alt="preview"
                    className=" w-full rounded-lg"
                    width={300}
                    height={400}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-[350px] flex-1  items-center justify-center">
                <span className="text-4xl text-neutral-600"><BiImage /></span>
                <h6 className=" text-neutral-600 text-lg">No hay imagen</h6>
                <p className=" text-sm text-neutral-700 ">Seleccione una imagen desde tu dispositivo</p>
              </div>
            )}
          </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                inputImage.current?.click();
              }}
              className="  text-xl w-fit "
            >
              <MdOutlineCameraAlt />
            </button>
            <input
              className="hidden"
              type="file"
              name="file"
              ref={inputImage}
              onChange={handleChangeFile}
            />
        </div>
      </form>
    </div>
  );
};

export default FormPost;

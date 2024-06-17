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


const FormPost = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const [text, setText] = useState("");
  const { handleChangeFile, file, selectedImage } = useLoadImage("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [status, setStatus] = useState<
    "typing" | "loading" | "success" | "error"
  >("typing");

  const inputImage = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const supabase = createClient()
  const postService = new PostService(supabase);

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
            className=" disabled:text-sky-300 disabled:cursor-not-allowed cursor-pointer text-sm text-sky-600"
          >
            Publicar
          </button>
        </header>
        <div className="flex flex-col flex-1  gap-6">
          <div className=" flex flex-col relative w-full">
            <textarea
              value={text}
              name="content"
              id=""
              onChange={(e) => setText(e.target.value)}
              placeholder="Que estas pensando?"
              className="w-full h-[100px]  p-3 my-2 text-sm grow focus:outline-none bg-transparent placeholder:text-sm"
              autoFocus={true}
              style={{}}
            />
            <div className=" hidden sm:flex relative  justify-end">
              <button
                className="self-end text-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setShowEmoji(!showEmoji);
                }}
              >
                <BiHappy />
              </button>
              {showEmoji && (
                <div className="absolute top-[30px] right-[0]">
                  <EmojiPicker onSelect={(e) => setText(text + e)} />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col w-full ">
            {selectedImage ? (
              <div className="flex flex-1 justify-center w-full ">
                <div>
                  <Image
                    src={selectedImage}
                    alt="preview"
                    className=" max-w-[270px] rounded-lg"
                    width={300}
                    height={400}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-[350px] flex-1  items-center justify-center"></div>
            )}
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
        </div>
      </form>
    </div>
  );
};

export default FormPost;

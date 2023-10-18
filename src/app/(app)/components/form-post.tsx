"use client";

import EmojiPicker from "@/app/components/emoji-picker";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useRef, useState } from "react";
import { BiHappy, BiImage, BiX } from "react-icons/bi";
import { useRouter } from "next/navigation";
import useLoadImage from "@/app/hooks/useLoadImage";
import PostService from "@/app/services/post";
import Loader from "@/app/components/loader";

const FormPost = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const [text, setText] = useState("");
  const { handleChangeFile, file, seletedImage } = useLoadImage("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [status, setStatus] = useState<
    "typing" | "loading" | "success" | "error"
  >("typing");

  const inputImage = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const supabase = createClientComponentClient();
  const postService = new PostService(supabase);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setStatus("loading");

    if (file !== null) {
      const { data, error: errorPost } = await postService.add(text, file);
      console.log(data, errorPost);
      if (errorPost === null) {
        router.refresh();
        onCloseModal();
        setStatus("success");
      }

      setStatus("error");
    }

    setStatus("error");
  };

  return (
    <div className="relative bg-white dark:bg-black p-6 w-full max-w-[600px] m-2 rounded-lg">
      {status === "loading" && (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-[#e4e4e4b4] z-20 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Loader />

            <p className="text-[18px] font-bold text-black">Posteando</p>
          </div>
        </div>
      )}
      <button className="absolute right-2 top-2" onClick={onCloseModal}>
        <BiX />
      </button>

      <form onSubmit={handleSubmit} className="relative">
        <header className="flex w-full justify-between mt-2 mb-2">
          <h2 className=" text-xl text-gray-700 dark:text-white">
            Crear un post
          </h2>
          <button type="submit" className=" text-base text-sky-600">
            Crear
          </button>
        </header>
        <div className="flex flex-col  gap-6">
          <div className=" flex flex-col relative w-full">
            <textarea
              value={text}
              name="content"
              id=""
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe un pie de foto..."
              className="w-full h-[100px]  p-3 mt-2 text-lg grow focus:outline-none hover:bg-gray-200 dark:bg-transparent dark:hover:bg-gray-900"
              autoFocus={true}
              style={{}}
            />
            <div className="relative flex justify-end">
              <button
                className="self-end"
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
          <div className="flex flex-col w-full  h-[380px] items-center justify-center">
            {seletedImage ? (
              <div className="overflow-auto flex items-center justify-center h-[350px] w-full">
                <img
                  src={seletedImage}
                  alt="preview"
                  className="w-full h-auto max-h-[350px]"
                />
              </div>
            ) : (
              <div className="flex flex-col h-[350px]  items-center justify-center">
                <div className="w-[60px] h-[60px]">
                  <BiImage className="w-full h-full text-gray-500" />
                </div>
                <p className="text-lg text-gray-500">Elige una foto</p>
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                inputImage.current?.click();
              }}
              className="bg-sky-500 text-white p-2 px-5 my-3 text-base rounded-xl"
            >
              Selecciona un archivo
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

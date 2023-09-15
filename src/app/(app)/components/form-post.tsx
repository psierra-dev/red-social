"use client";

import EmojiPicker from "@/app/components/emoji-picker";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useRef, useState } from "react";
import { BiHappy, BiImage } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const FormPost = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [status, setStatus] = useState<
    "typing" | "loading" | "success" | "error"
  >("typing");

  const router = useRouter();

  const supabase = createClientComponentClient();
  const inputImage = useRef<HTMLInputElement | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus("loading");
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (file !== null) {
      const idImage = uuidv4();
      const { data, error } = await supabase.storage
        .from("post")
        .upload(`${session?.user.id}/${idImage}`, file);
      console.log(data, error);
      const {
        data: { publicUrl },
      } = supabase.storage.from("post").getPublicUrl(data?.path as string);

      const { data: post, error: errorPost } = await supabase
        .from("posts")
        .insert({
          content: text,
          image_url: publicUrl,
          user_id: session?.user.id,
        });

      if (errorPost === null) {
        router.refresh();
        onCloseModal();
        setStatus("success");
      }

      console.log(post);
      console.log(errorPost);
    }
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file = e.target.files;
    if (file && file[0]) {
      console.log(file);
      setFile(file[0]);
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };

      reader.readAsDataURL(file[0]);
    }
  };

  return (
    <div className="relative bg-white p-6 w-full max-w-[600px] m-2 rounded-lg">
      {status === "loading" && (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-[#e4e4e4b4] z-20 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-t-4 border-black border-solid border-opacity-50 rounded-full animate-spin"></div>

            <p className="text-[18px] font-bold text-black">Posteando</p>
          </div>
        </div>
      )}
      <h2 className="text-start text-2xl text-gray-700">Crear un post</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col  gap-6">
          <div className=" flex flex-col relative w-full">
            <textarea
              value={text}
              name="content"
              id=""
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe un pie de foto..."
              className="w-full h-[100px]  p-3 mt-2 text-lg grow focus:outline-none hover:bg-gray-200"
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
            {selectedImage ? (
              <div className="overflow-auto flex items-center justify-center h-[350px] w-full">
                <img
                  src={selectedImage}
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

        <button
          type="submit"
          className="absolute top-4 right-4 text-lg text-sky-600"
        >
          Crear
        </button>
      </form>
    </div>
  );
};

export default FormPost;

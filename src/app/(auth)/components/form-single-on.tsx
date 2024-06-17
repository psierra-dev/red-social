"use client";
import React, { useRef, useState } from "react";
import Input from "../../(app)/components/input";
import useDebounce from "@/app/hooks/useDebounce";
import useSearchAvatarName from "@/app/hooks/useSearchAvatarName";
import useLoadImage from "@/app/hooks/useLoadImage";
import Image from "next/image";
import UserService from "@/app/services/user";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/loader";
import { BiUserCircle } from "react-icons/bi";
import { User } from "@/app/types/user";
import { createClient } from "@/app/utils/supabase/client";

const FormSingleOn = ({ user }: { user: User }) => {
  const router = useRouter();
  const supabase = createClient();

  const userService = new UserService(supabase);
  const [text, settText] = useState(user?.user_name ?? "");

  const { debouncedValue } = useDebounce(
    text !== user?.user_name ? text : "",
    50
  );
  const { status, loading } = useSearchAvatarName(debouncedValue as string);

  const { handleChangeFile, file, selectedImage } = useLoadImage("");
  const inputImage = useRef<HTMLInputElement | null>(null);
  const [statu, setStatu] = useState<
    "typing" | "loading" | "error" | "success"
  >("typing");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    settText(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatu("loading");

    if (text !== user?.user_name) {
      const { data, error } = await userService.update(
        { user_name: text, is_completed: true },
        file,
        true
      );
      console.log(data, error);
      if (error === null) {
        router.push("/");
        return
      }

      setStatu("error");

      setTimeout(() => setStatu("typing"), 1000);
      return 
    }

    router.push("/");
    console.log(text);
  };

  return (
    <div className="flex flex-col  border-2 rounded-xl  w-full max-w-[450px] p-6 md:p-10 m-2 gap-4">
      <h2 className=" text-lg text-center ">Completar perfil</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col items-center">
          {selectedImage ? (
            <Image
              width={500}
              height={500}
              src={selectedImage}
              alt=""
              className="w-[150px] h-[150px] rounded-full"
            />
          ) : (
            <div className="w-[150px] h-[150px] rounded-full flex items-center justify-center text-8xl">
              <BiUserCircle />{" "}
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              inputImage.current?.click();
            }}
            className=" text-xs font-thin text-sky-600 mt-1"
          >
            Añadir foto de perfil
          </button>
          <input
            className="hidden"
            type="file"
            name="file"
            ref={inputImage}
            onChange={handleChangeFile}
          />
        </div>

        <Input
          name="usuario"
          type="text"
          label="Nombre de usuario"
          handleChange={handleChange}
          required
          text={text}
          customError={
            status === "is_used"
              ? { message: "Este nombre de usuario ya esta usado" }
              : null
          }
          correct={
            status === "not_used"
              ? { message: "Si puedes usar este nombre de usuario" }
              : null
          }
        />

        <button
          type="submit"
          className="w-full p-2 mt-3 rounded-lg bg-sky-500 disabled:bg-sky-300 disabled:cursor-not-allowed cursor-pointer text-white flex justify-center items-center text-sm"
          disabled={status === "is_used" || loading || text.length < 1}
        >
          {statu === "loading" ? (
            <Loader w="6" h="6" color="white" />
          ) : (
            "Completar"
          )}
        </button>
      </form>
    </div>
  );
};

export default FormSingleOn;

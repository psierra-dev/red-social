"use client";
import { formEditUserSchema } from "@/app/schema/zod";
import UserService from "@/app/services/user";
import { User } from "@/app/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BiX } from "react-icons/bi";
import * as z from "zod";
import Loader from "@/app/components/loader";
import useLoadImage from "@/app/hooks/useLoadImage";
import Image from "next/image";

type FormData = z.infer<typeof formEditUserSchema>;

const FormEdit = ({ user }: { user: User }) => {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formEditUserSchema),
    defaultValues: {
      full_name: user.full_name,
      user_name: user.user_name,
    },
  });

  const router = useRouter();
  const { handleChangeFile, file, seletedImage } = useLoadImage(
    user?.avatar_url as string
  );

  const [status, setStatus] = useState<
    "typing" | "loading" | "success" | "error"
  >("typing");

  const inputImage = useRef<HTMLInputElement | null>(null);
  const supabase = createClientComponentClient();
  const userService = new UserService(supabase);

  const onSubmit = async (data: FormData) => {
    setStatus("loading");

    const { data: d, error } = await userService.update(
      data,
      file,
      user.avatar_url !== seletedImage
    );

    if (error !== null) setStatus("error");

    setStatus("success");

    setTimeout(() => {
      setStatus("typing");
      router.refresh();
    }, 2000);
  };

  const isEq =
    user.full_name !== watch("full_name") ||
    user.user_name !== watch("user_name") ||
    user.avatar_url !== seletedImage
      ? true
      : false;

  return (
    <div className=" w-full max-w-[500px]">
      <div className="flex m-2 gap-2">
        <button className="text-2xl" onClick={() => router.back()}>
          <BiX />
        </button>
        <h2 className=" text-xl">Editar Perfil</h2>
      </div>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 m-3 mt-6"
      >
        <div>
          <Image
            width={50}
            height={50}
            src={seletedImage}
            alt=""
            className="w-[40px] h-[40px] rounded-full"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              inputImage.current?.click();
            }}
            className=" text-xs font-thin text-sky-600"
          >
            Cambiar foto de perfil
          </button>
          <input
            className="hidden"
            type="file"
            name="file"
            ref={inputImage}
            onChange={handleChangeFile}
          />
        </div>
        <div className="flex flex-col">
          <label className=" text-xs font-normal mb-1">Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            {...register("full_name", { required: true })}
            className="border-[1.3px] border-gray-300 p-2 text-xs font-thin text-black dark:text-white dark:bg-transparent"
          />
          {errors.full_name && (
            <p
              className=" text-xs text-red-600 font-thin mt-1
            "
            >
              {errors.full_name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className=" text-xs font-normal mb-1">Usuario</label>
          <input
            type="text"
            placeholder="Usuario"
            {...register("user_name", { required: true })}
            className="border-[1.3px] border-gray-300 p-2 text-xs font-thin text-black dark:text-white dark:bg-transparent"
          />
          {errors.user_name && (
            <p className=" text-xs text-red-600 font-thin mt-1">
              {errors.user_name.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`p-2 bg-sky-600 rounded-lg text-white text-sm flex justify-center ${
            !isEq ? "bg-sky-200" : ""
          }`}
          disabled={!isEq}
        >
          {status === "loading" ? (
            <Loader w="6" h="6" color="white" />
          ) : (
            "Enviar"
          )}
        </button>

        {status === "success" && (
          <p className=" text-green-600 text-sm font-thin ">
            Se actualizo correctamente
          </p>
        )}
      </form>
    </div>
  );
};

export default FormEdit;

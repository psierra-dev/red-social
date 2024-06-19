"use client";
import { useRef } from "react";
import { FieldError, Path, UseFormRegister } from "react-hook-form";
import { BiLockOpen, BiUser } from "react-icons/bi";
import { MdOutlineEmail, MdDriveFileRenameOutline } from "react-icons/md";
import { formAuthSchema } from "@/app/schema/zod";
import * as z from "zod";

type FormData = z.infer<typeof formAuthSchema>;

const TYPE_INPUT = {
    email: {
        label: "Email",
        icon: <MdOutlineEmail />,
    },
    password: {
        label: "Contraseña",
        icon: <BiLockOpen />        ,
    },
    user: {
        label: "Usuario",
        icon: <BiUser />,
    },
    fullname: {
        label: "Nombre Completo",
        icon: <MdDriveFileRenameOutline />
        ,
    }
}

type VariantType = "email" | "password" | "user" | "fullname"

type InputProps = {
    variant: VariantType;
    name:  Path<FormData>;
    text: string;
    label?: string;
    required: boolean;
    register?: UseFormRegister<FormData>;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: FieldError;
    customError?: { message: string } | null;
    correct?: { message: string } | null;
    type: string;
    placeholder?: string;
    value?: string;
  };

const Input = ({ variant, customError, error, correct, name, required, register, ...props }: InputProps) => {
    const label = TYPE_INPUT[variant as VariantType].label;
    const icon = TYPE_INPUT[variant as VariantType].icon;
    const inputRef = useRef<HTMLInputElement>(null)

    console.log(error,"error")

    let classInput = `flex h-[52px] border-[0.2px] gap-4  border-neutral-800 items-center rounded-lg bg-transparent outline-none focus:border-gray-400 mb-2 relative ${
      error || customError
        ? "border-red-400 focus:border-red-400 outline-none"
        : ""
    } ${
      correct && "border-green-400 focus:border-green-400 outline-none"
    }`;


    const customInput = () => {
        if (register) {
          return (
            <input
              {...props}
              className="w-full h-fit placeholder:text-xs placeholder:text-neutral-400 placeholder:font-thin text-[13px] text-white bg-transparent"
              {...register(name, { required })}
            />
          );
        } else {
          return (
            <input
                {...props}
                className="w-full h-fit placeholder:text-xs placeholder:text-neutral-400 placeholder:font-thin text-[13px] text-white bg-transparent"
            />
          );
        }
      };

  return (
  <div className={classInput}>
    <div className=" h-full w-[52px] flex justify-center items-center border-r-[0.3px]  border-neutral-500">
    <span className=" text-white text-lg">{icon}</span>
    </div>
    <div className="w-full flex flex-col gap-1">
    <label className=" text-white text-xs text-neutral-400">{label}</label>
    {customInput()}

    </div>

   
      {error || customError ? (
        <p className="absolute top-[53px] text-[11px] md:text-xs text-red-500 font-thin">
          {error?.message || customError?.message}
        </p>
      ) : null}
      {correct ? (
        <p className="text-[11px] md:text-xs absolute top-[53px] text-green-500 font-thin">
          {correct.message}
        </p>
      ) : null}
  </div>
  );
};

export default Input
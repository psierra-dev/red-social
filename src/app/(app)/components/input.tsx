"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  ValidationRule,
  FieldError,
  UseFormGetValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { formAuthSchema } from "@/app/schema/zod";
import * as z from "zod";

type FormData = z.infer<typeof formAuthSchema>;
type InputProps = {
  name: Path<FormData>;
  watch: UseFormGetValues<Record<string, any>>;
  label: string;
  required: boolean;
  register: UseFormRegister<FormData>;
  error?: FieldError;
  type: string;
  placeholder?: string;
};

const Input = ({
  label,
  required,
  error,
  type,
  name,
  register,
  watch,
}: InputProps) => {
  const w = watch(name);

  return (
    <div className="flex flex-col">
      <label className="flex relative m-0 h-[40px]">
        <span
          className={`absolute top-0 left-[8px] right-0 leading-[40px] text-xs font-thin text-gray-500 transition-transform ease-in-out duration-100 origin-left ${
            w?.length! > 0 && "-translate-y-[10px] text-[8px]"
          }`}
        >
          {label}
        </span>
        <input
          type={type}
          className={`w-full border-2 outline-none focus:border-gray-400 ${
            error && "border-red-400 focus:border-red-400 outline-none"
          } rounded-lg text-xs font-thin pt-3 pl-2`}
          {...register(name, { required })}
        />
      </label>
      {error && (
        <p className=" mt-1 text-xs text-red-500 font-thin">{error?.message}</p>
      )}
    </div>
  );
};

export default Input;

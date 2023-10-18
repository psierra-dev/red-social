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
  text: string;
  label: string;
  required: boolean;
  register?: UseFormRegister<FormData>;
  error?: FieldError;
  customError?: { message: string } | null;
  correct?: { message: string } | null;
  type: string;
  placeholder?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const Input = ({
  label,
  required,
  error,
  type,
  name,
  register,
  text,
  handleChange,
  value,
  correct,
  customError,
}: InputProps) => {
  const customImput = () => {
    let classInput = `w-full bg-transparent border-[1px] outline-none focus:border-gray-400 ${
      error || customError
        ? "border-red-400 focus:border-red-400 outline-none"
        : ""
    } ${
      correct && "border-green-400 focus:border-green-400 outline-none"
    } rounded-lg text-xs font-thin pt-3 pl-2`;
    if (register) {
      return (
        <input
          type={type}
          className={classInput}
          {...register(name, { required })}
        />
      );
    } else {
      return (
        <input
          type={type}
          value={text}
          className={classInput}
          onChange={handleChange}
        />
      );
    }
  };

  return (
    <div className="flex flex-col">
      <label className="flex relative m-0 h-[40px]">
        <span
          className={`absolute top-0 left-[8px] right-0 leading-[40px] text-xs font-thin text-gray-500 transition-transform ease-in-out duration-100 origin-left ${
            text?.length! > 0 && "-translate-y-[10px] text-[8px]"
          }`}
        >
          {label}
        </span>
        {customImput()}
      </label>
      {error || customError ? (
        <p className=" mt-1 text-xs text-red-500 font-thin">
          {error?.message || customError?.message}
        </p>
      ) : null}
      {correct ? (
        <p className=" mt-1 text-xs text-green-500 font-thin">
          {correct.message}
        </p>
      ) : null}
    </div>
  );
};

export default Input;

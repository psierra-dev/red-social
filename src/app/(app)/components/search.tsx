"use client";
import Skeleton from "@/app/components/skeleton";
import { User } from "@/app/types/user";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";

const Search = ({ onClose }: { onClose: () => void }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [status, setStatus] = useState<
    "typing" | "loading" | "success" | "error"
  >("typing");
  const [data, setData] = useState<User[] | []>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus("loading");

    if (e.target.value.length > 0) {
      const { data: users, error } = await supabase
        .from("users")
        .select()
        .ilike("full_name", "%" + e.target.value + "%");

      if (users) {
        setData(users as User[]);
        setStatus("success");
      } else if (error) {
        setStatus("error");
      }
    } else {
      setData([]);
      setStatus("typing");
    }
  };
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col w-[500px] bg-white dark:bg-black rounded-xl">
      <header className="flex flex-col p-6 border-b-2 w-full mb-3 relative">
        <h2 className="text-start text-xl mb-4">Búsquedad</h2>
        <div className="flex w-full gap-2 border-2 p-2 items-center border-sm border-gray-500 rounded-2xl">
          <BiSearch />
          <input
            type="text"
            name=""
            id=""
            className="w-full border-none text-[16px] focus:outline-none text-black dark:text-white dark:bg-transparent"
            placeholder="Buscar"
            onChange={handleChange}
          />
        </div>

        <button
          className=" cursor-pointer absolute right-2 top-2"
          onClick={onClose}
        >
          <BiX />
        </button>
      </header>

      <div className="overflow-auto p-6">
        {status === "loading" &&
          [1, 3, 4, 5, 6, 7, 8].map((s) => <Skeleton key={s} />)}
        {status !== "loading" && data.length > 0
          ? data.map((e) => (
              <div
                key={e.id}
                onClick={() => {
                  router.push("/" + e.user_name);
                  router.refresh();
                  onClose();
                }}
                className="flex gap-4 border-b-2 p-2 hover:bg-gray-800 cursor-pointer"
              >
                <Image
                  width={50}
                  height={50}
                  alt="avatar"
                  src={e.avatar_url as string}
                  className="w-10 h-10 rounded-4xl"
                />
                <div className=" flex flex-col text-left">
                  <p className="text-xs text-bold md:text-sm ">{e.user_name}</p>
                  <p className="text-xs text-thin md:text-sm text-gray-400">
                    {e.full_name}
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Search;

import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import LinkCustom from "./link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { Database } from "@/app/types/database";
import ButtonModal from "./btn-modal";
import ButtonSearch from "./btn-search";
const NavBar = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getUser();
  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("id", data && (data?.user?.id as string));

  console.log(user, "user");
  return (
    <div className="fixed bottom-0 z-40 md:left-0 md:top-0 w-full md:w-auto bg-white border-2 p-1 md:p-4 rounded-t-[30px] md:rounded-none">
      <nav>
        <ul className="flex md:flex-col md:gap-6 justify-between items-center ">
          <li className="text-3xl">
            <LinkCustom href="/">
              <BiHomeAlt />
            </LinkCustom>
          </li>
          <li className="text-3xl">
            <ButtonModal />
          </li>
          <li className="text-3xl">
            <ButtonSearch />
          </li>
          <li className="text-3xl">
            {user && user?.length > 0 ? (
              <LinkCustom href={"/" + user[0].id}>
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white"
                  src={user[0].avatar_url ? user[0].avatar_url : ""}
                  alt=""
                  width={6}
                  height={6}
                />
              </LinkCustom>
            ) : null}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

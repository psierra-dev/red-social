"use client";
import { BiBrightnessHalf, BiLogOut } from "react-icons/bi";

import { useRouter } from "next/navigation";
import { useState } from "react";

import ClickOutsideComponent from "@/app/components/click-outside";
import { createClient } from "@/app/utils/supabase/client";
import MenuTheme from "@/app/components/menu-theme";

const OptionMenu = ({ style }: { style: string }) => {
  const supabase = createClient();
  const router = useRouter();
  const [menuTheme, setMenuTheme] = useState(false);

  return (
    <div
      className={`${style} bg-white dark:bg-neutral-900 py-2 min-w-[250px] rounded-xl shadow-lg`}
    >
      <ul>
        <li className=" w-full relative ">
          <div
            onClick={() => setMenuTheme(true)}
            className=" w-full cursor-pointer hover:bg-slate-100 dark:hover:bg-neutral-800 p-3 text-xs font-light flex justify-between items-center"
          >
            <div className="flex gap-2 items-center">
              <span className=" text-xl">
                <BiBrightnessHalf />
              </span>
              <span>Cambiar aspecto</span>
            </div>
          </div>
          {menuTheme && (
            <ClickOutsideComponent onClose={() => setMenuTheme(false)}>
              <MenuTheme />
            </ClickOutsideComponent>
          )}
        </li>
        <li className=" w-full">
          <div
            onClick={async () => {
              await supabase.auth.signOut();
              router.refresh();
            }}
            className=" w-full cursor-pointer hover:bg-slate-100 dark:hover:bg-neutral-800 p-3 text-xs font-light flex gap-2 items-center"
          >
            <span className=" text-xl">
              <BiLogOut />
            </span>
            Salir
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OptionMenu;
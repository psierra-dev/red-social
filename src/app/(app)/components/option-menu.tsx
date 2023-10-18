"use client";
import { BiBrightnessHalf, BiLogOut } from "react-icons/bi";
import BtnTema from "./btn-tema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const OptionMenu = ({ style }: { style: string }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  return (
    <div
      className={`${style} bg-white dark:bg-gray-700 p-2 min-w-[250px] rounded-xl shadow-lg`}
    >
      <ul>
        <li className=" w-full">
          <div className=" w-full hover:bg-slate-100 dark:hover:bg-gray-500 p-3 text-xs font-light flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <span className=" text-xl">
                <BiBrightnessHalf />
              </span>
              <span>Cambiar aspecto</span>
            </div>
            <BtnTema />
          </div>
        </li>
        <li className=" w-full">
          <div
            onClick={async () => {
              await supabase.auth.signOut();
              router.refresh();
            }}
            className=" w-full cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-500 p-3 text-xs font-light flex gap-2 items-center"
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

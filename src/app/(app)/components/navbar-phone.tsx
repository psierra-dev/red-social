"use client";
import Link from "next/link";
import BtnNotification from "./btn-notification";
import { User } from "@/app/types/user";
import logo from "@/app/assets/NextGram.png"
import Image from "next/image";

const NavbarPhone = ({ num_noti, user }: { num_noti: number; user: User }) => {
  return (
    <div className=" order-0 md:hidden">
      <nav className=" flex flex-col items-stretch relative">
        <div className="flex items-stretch h-[46px]">
          <header className="fixed top-0 z-30  w-full bg-white dark:bg-black p-1 rounded-b-[30px] md:hidden">
            <div className="w-full flex justify-between items-center">
             <h3 className=" text-base font-bold">NextGram</h3>

              <Link href={"/notification"}>
                <BtnNotification noti={num_noti} user_id={user?.id} />
              </Link>
            </div>
          </header>
        </div>
      </nav>
    </div>
  );
};

export default NavbarPhone;

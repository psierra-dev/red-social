"use client";
import Link from "next/link";
import BtnNotification from "./btn-notification";
import { NotificationsProvider } from "@/app/store/NotificationProvider";
import { User } from "@/app/types/user";

const NavbarPhone = ({ num_noti, user }: { num_noti: number; user: User }) => {
  return (
    <div className=" order-0 md:hidden">
      <nav className=" flex flex-col items-stretch relative">
        <div className="flex items-stretch h-[46px]">
          <header className="fixed top-0 z-30  w-full bg-white dark:bg-black p-2 rounded-b-[30px] md:hidden">
            <div className="w-full flex justify-between">
              <h1>Logo</h1>

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

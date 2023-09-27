"use client";
import Link from "next/link";
import BtnNotification from "./btn-notification";
import { NotificationsProvider } from "@/app/store/NotificationProvider";
import { User } from "@/app/types/user";

const NavbarPhone = ({
  num_noti,
  user,
}: {
  num_noti: number;
  user: User[];
}) => {
  return (
    <div className="fixed top-0 z-40  w-full bg-white border-2 p-2 rounded-b-[30px] md:hidden">
      <div className="w-full flex justify-between">
        <h1>Logo</h1>

        <Link href={"/notification"}>
          <BtnNotification noti={num_noti} user_id={user[0].id} />
        </Link>
      </div>
    </div>
  );
};

export default NavbarPhone;

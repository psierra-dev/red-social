"use client";
import React, { useState, Suspense } from "react";
import { BiHomeAlt } from "react-icons/bi";
import LinkCustom from "./link";
import ButtonModal from "./btn-modal";
import ButtonSearch from "./btn-search";
import BtnNotification from "./btn-notification";
import Notification from "./notification";
import { User } from "@/app/types/user";
import { NotificationsProvider } from "@/app/store/NotificationProvider";
const NavBar = ({ user, num_noti }: { user: User[]; num_noti: number }) => {
  const [showNoti, setNotiShow] = useState(false);

  return (
    <div className="fixed bottom-0 z-40 md:left-0 md:top-0 w-full md:w-auto bg-white border-2 p-1 md:p-4 rounded-t-[30px] md:rounded-none">
      <div className="relative">
        <div className="flex justify-between relative">
          <div className="w-full md:w-auto">
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
                <li className="hidden md:block">
                  <BtnNotification
                    onShow={() => setNotiShow(!showNoti)}
                    noti={num_noti}
                    user_id={user[0].id}
                  />
                </li>
                <li className="text-3xl">
                  <Suspense fallback={<div>loading...</div>}>
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
                  </Suspense>
                </li>
              </ul>
            </nav>
          </div>
          <div className="hidden md:block ">
            {showNoti && (
              <div className="min-w-[340px]">
                <Notification />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

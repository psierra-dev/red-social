"use client";
import React, {useState, Suspense, useRef} from "react";
import {BiHomeAlt, BiUserCircle} from "react-icons/bi";
import LinkCustom from "./link";
import ButtonModal from "./btn-post";
import ButtonSearch from "./btn-search";
import BtnNotification from "./btn-notification";
import Notification from "./notification";
import {User} from "@/app/types/user";
import BtnMenu from "./btn-menu";
import Image from "next/image";
import ClickOutside from "@/app/components/click-outside";
const NavBar = ({user, num_noti}: {user: User; num_noti: number}) => {
  const [showNoti, setNotiShow] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="fixed bottom-0 z-40 md:left-0 md:top-0 w-full md:w-auto rounded-t-[30px] md:rounded-none bg-white dark:bg-black dark:text-white">
      <div className="relative md:h-full">
        <div className="flex justify-between md:h-full relative">
          <div className="w-full h-full md:w-auto md:flex md:flex-col md:justify-between md:items-center md:p-4 p-1 md:border-r-2 md:border-gray-300">
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
                    ref={buttonRef}
                    onShow={() => setNotiShow(!showNoti)}
                    noti={num_noti}
                    user_id={user?.id}
                  />
                </li>
                <li className="text-3xl">
                  <Suspense fallback={<div>loading...</div>}>
                    {user ? (
                      <LinkCustom href={"/" + user.user_name}>
                        {user.avatar_url ? (
                          <Image
                            className="inline-block h-9 w-9 rounded-full ring-2 ring-white"
                            src={user?.avatar_url ? user.avatar_url : ""}
                            alt=""
                            width={50}
                            height={50}
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-full">
                            <BiUserCircle className="h-full w-full" />
                          </div>
                        )}
                      </LinkCustom>
                    ) : null}
                  </Suspense>
                </li>
              </ul>
            </nav>

            <BtnMenu />
          </div>
          {showNoti && (
            <ClickOutside
              onClose={(event) => {
                if (
                  buttonRef.current &&
                  !buttonRef.current.contains(event?.target as Node)
                ) {
                  setNotiShow(false);
                }
              }}
            >
              <div className="hidden md:block absolute left-[70px] transition ease-in-out delay-150 translate-x-[0%]">
                <div className="min-w-[340px] px-2">
                  <Notification />
                </div>
              </div>
            </ClickOutside>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

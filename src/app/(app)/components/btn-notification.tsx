"use client";
import UserService from "@/app/services/user";
import {
  NotificationsContext,
  NotificationsDispatchContext,
} from "@/app/store/NotificationProvider";
import { createClient } from "@/app/utils/supabase/client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { BiBell } from "react-icons/bi";

const BtnNotification = ({
  noti,
  onShow,
  user_id,
}: {
  noti?: number;
  onShow?: () => void;
  user_id: string;
}) => {
  const supabase = createClient();
  const [numberNoti, setNumberNoti] = useState(noti);
  const dispatch = useContext(NotificationsDispatchContext);
  const state = useContext(NotificationsContext);
  const pathname = usePathname();
  const userService = new UserService(supabase);

  useEffect(() => {
    dispatch && noti && dispatch({ type: "SET_NOTIFICATIONS", payload: noti });
  }, [noti, dispatch]);
  useEffect(() => {
    console.log(user_id, "useeffect");
    const chanel = supabase
      .channel("schema-db-change")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `receptor_id=eq.${user_id}`,
        },
        (payload) => {
          console.log(payload);
          console.log(payload.errors);
          if (payload.errors === null) {
            dispatch && dispatch({ type: "ADD_NOTIFICATION", payload: 1 });
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(chanel);
    };
  }, [supabase, dispatch, user_id]);

  useEffect(() => {
    console.log("path", pathname);
    if (pathname === "/notification")
      dispatch && dispatch({ type: "DELETE_NOTIFICATION", payload: 0 });
  }, [pathname]);
  return (
    <>
      <div className="relative cursor-pointer" onClick={onShow}>
        <div className=" bg-sky-700 flex justify-center items-center text-white absolute top-[-5%] right-0 w-[20px] h-[20px] rounded-full">
          <span className=" text-xs text-center">{state?.count}</span>
        </div>
        <div className=" text-3xl">
          <BiBell />
        </div>
      </div>
    </>
  );
};

export default BtnNotification;

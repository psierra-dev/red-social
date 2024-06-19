"use client";
import {
  NotificationsContext,
  NotificationsDispatchContext,
} from "@/app/store/NotificationProvider";
import { createClient } from "@/app/utils/supabase/client";
import { usePathname } from "next/navigation";
import React, { useEffect, useContext, forwardRef } from "react";
import { BiBell } from "react-icons/bi";

interface Props {
  noti?: number;
  onShow?: () => void;
  user_id: string;
}

const BtnNotification = forwardRef((props: Props, ref) => {
  const supabase = createClient();
  const dispatch = useContext(NotificationsDispatchContext);
  const state = useContext(NotificationsContext);
  const pathname = usePathname();

  useEffect(() => {
    dispatch && props?.noti && dispatch({ type: "SET_NOTIFICATIONS", payload: props.noti });
  }, [props.noti, dispatch]);
  useEffect(() => {
    const chanel = supabase
      .channel("schema-db-change")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `receptor_id=eq.${props.user_id}`,
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
  }, [supabase, dispatch, props.user_id]);

  useEffect(() => {
    if (pathname === "/notification")
      dispatch && dispatch({ type: "DELETE_NOTIFICATION", payload: 0 });
  }, [pathname]);
  return (
    <>
      <button ref={ref} className="relative border-none cursor-pointer p-2 hover:bg-[#80808056] rounded-md" onClick={props.onShow}>
        <div className=" bg-sky-700 flex justify-center items-center text-white absolute top-[-5%] right-0 w-[20px] h-[20px] rounded-full">
          <span className=" text-xs text-center">{state?.count}</span>
        </div>
        <div className=" text-3xl">
          <BiBell />
        </div>
      </button>
    </>
  );
});

export default BtnNotification;

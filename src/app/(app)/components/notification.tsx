//import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
"use client";
import NotificationService from "@/app/services/notification";
import {
  NotificationsContext,
  NotificationsDispatchContext,
} from "@/app/store/NotificationProvider";
import { TNotification } from "@/app/types/notification";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
const Notification = () => {
  const supabase = createClientComponentClient();
  const notiService = new NotificationService(supabase);
  const [notifications, setNotifications] = useState<TNotification[] | []>([]);
  //const router = useRouter()
  const dispatch = useContext(NotificationsDispatchContext);

  useEffect(() => {
    dispatch && dispatch({ type: "DELETE_NOTIFICATION", payload: 0 });
  }, []);

  useEffect(() => {
    const getNotifications = async () => {
      const { data, error } = await notiService.getAll();
      console.log(data, error);
      if (error === null && data !== null) setNotifications(data);
    };

    getNotifications();
  }, []);
  return (
    <div className=" w-full overflow-y-auto bg-white dark:bg-black min-h-screen">
      <header className="p-2">
        <h4 className=" text-md font-bold">Notificaciones</h4>
      </header>

      <div className="flex flex-col gap-2">
        {notifications.map((e) => (
          <CardNotification key={e.id} data={e} />
        ))}
      </div>
    </div>
  );
};

export default Notification;

const CardNotification = ({ data }: { data: TNotification }) => {
  const router = useRouter();
  return (
    <Link href={`/c/${data.post_id}`}>
      <div
        key={data.id}
        className={`${
          data.read ? "" : " "
        } flex gap-2 p-2  cursor-pointer hover:scale-100`}
        onClick={() => {
          /*if (data.type === "comments" || data.type === "likes") {
          router.push(`/c/${data.post_id}`);
        }*/
        }}
      >
        <div className={``}>
          <Image
            src={data?.from?.avatar_url!}
            width={15}
            height={15}
            alt="a"
            className="w-8 h-8 rounded-full"
          />
        </div>

        <div className="">
          <Link href={`/${data.from.id}`} prefetch={false}>
            <span className=" text-xs mr-1">{data.from.full_name}</span>
          </Link>
          <span className=" text-xs font-thin">
            {data.type === "likes" && "le ha gustado tu posteo"}
            {data.type === "comments" && "ha comentado tu posteo"}
            {data.type === "followers" && "ha comenzado a seguirte"}
          </span>
        </div>
      </div>
    </Link>
  );
};

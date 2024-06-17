"use client";

import FollowersService from "@/app/services/followers";
import NotificationService from "@/app/services/notification";
import { createClient } from "@/app/utils/supabase/client";
import React, { useState } from "react";

const ButtonFollower = ({
  followers_id,
  isFollowing,
}: {
  followers_id: string;
  isFollowing: boolean;
}) => {
  const [following, setFollowing] = useState(isFollowing);
  const supabase = createClient()
  const notiServe = new NotificationService(supabase);
  const followersService = new FollowersService(supabase);

  const handleFollower = async () => {
    if (!following) {
      const { data, error } = await followersService.add(followers_id);

      if (error === null) {
        setFollowing(true);

        await notiServe.add({
          receptor_id: followers_id,
          type: "followers",
        });
      }
    } else {
      const { data, error } = await followersService.delete(followers_id);
      console.log(data, error);
      if (error === null) setFollowing(false);
    }
  };
  return (
    <>
      <button
        className={` ${
          !following
            ? "bg-sky-500 hover:bg-sky-300"
            : "bg-transparent hover:bg-gray-800"
        }  w-full rounded-md p-2 mt-3 text-white text-sm`}
        onClick={handleFollower}
      >
        {!following ? "Seguir" : "Siguiendo"}
      </button>
    </>
  );
};

export default ButtonFollower;

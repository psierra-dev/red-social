"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";

const ButtonFollower = ({
  followers_id,
  owner_id,
  isFollowing,
}: {
  followers_id: string;
  owner_id: string;
  isFollowing: boolean;
}) => {
  console.log(isFollowing);
  const [following, setFollowing] = useState(isFollowing);
  const supabase = createClientComponentClient();

  const handleFollower = async () => {
    const { data, error } = await supabase.from("followers").insert({
      followers_id: followers_id,
      owner_id: owner_id,
    });
    console.log(data, error);
    if (error === null) {
      console.log("aquiii");
      setFollowing(true);
    }
  };
  return (
    <>
      {!following ? (
        <button
          className="bg-sky-500 hover:bg-sky-300 w-full rounded-md p-2 mt-3 text-white text-sm"
          onClick={handleFollower}
        >
          Seguir
        </button>
      ) : (
        <button className=" bg-white hover:bg-sky-300 w-full rounded-md p-2 mt-3 text-gray-700 text-sm">
          Siguiendo
        </button>
      )}
    </>
  );
};

export default ButtonFollower;

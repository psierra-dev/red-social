"use client";
import { Likes } from "@/app/types/likes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";

const BtnLike = ({
  likes,
  isLike,
  postId,
  userId,
}: {
  likes: Likes[];
  isLike: boolean;
  postId: number;
  userId: string;
}) => {
  const [allLikes, setAllLikes] = useState(likes.length);
  const [like, setLike] = useState(isLike);
  const supabase = createClientComponentClient();
  const handleLike = async () => {
    updateLike(like);

    if (like) {
      //deslike
      const { data, error } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);
      console.log(data, error);
      if (error) {
        updateLike(false);
      }
      console.log("deslike", data, error);
    } else {
      //like
      const { data, error } = await supabase.from("likes").insert({
        post_id: postId,
        user_id: userId,
      });

      if (error) {
        updateLike(true);
      }
      console.log("like", data, error);
    }
  };

  const updateLike = (state: boolean) => {
    setLike(!state);
    state ? setAllLikes((prev) => prev - 1) : setAllLikes((prev) => prev + 1);
  };
  return (
    <div className="flex flex-col mr-2 justify-center items-center">
      <button
        className={`text-3xl ${like ? "text-red-700" : ""}`}
        onClick={handleLike}
      >
        {like ? <BiSolidHeart /> : <BiHeart />}
      </button>

      <span>{allLikes}</span>
    </div>
  );
};

export default BtnLike;

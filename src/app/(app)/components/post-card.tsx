import { Post } from "@/app/types/post";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { BiHeart, BiMessageRounded } from "react-icons/bi";
import { cookies } from "next/headers";
import { Database } from "@/app/types/database";
import BtnLike from "./btn-like";
const PostCard = async ({ post }: { post: Post }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: likes } = await supabase
    .from("likes")
    .select()
    .eq("post_id", post.id);
  return (
    <div className="flex flex-col gap-3 p-4 md:p-8 rounded-xl max-w-[600px] shadow-lg">
      <header className="w-full">
        <div className="flex ">
          <img
            src={post.users?.avatar_url as string}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          <p>{post.users?.full_name}</p>
        </div>
      </header>

      <div>
        <img src={post?.image_url as string} alt="" />
      </div>

      <div className="flex w-full">
        {likes && (
          <BtnLike
            likes={likes}
            isLike={likes?.some((e) => e.user_id === session?.user.id)}
            postId={post.id}
            userId={session?.user.id as string}
          />
        )}
        <div className="flex flex-col justify-center items-center">
          <button className="text-3xl">
            <BiMessageRounded />
          </button>
          <span>{post.likes.length}</span>
        </div>
        <div className="grow"></div>
      </div>

      <div className="">
        <p>{post?.content}</p>
      </div>
    </div>
  );
};

export default PostCard;

import { Post } from "@/app/types/post";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { BiDotsHorizontalRounded, BiMessageRounded } from "react-icons/bi";
import { cookies } from "next/headers";
import { Database } from "@/app/types/database";
import BtnLike from "./btn-like";
import { timePosts } from "@/app/util/hora";
import OptionPost from "./option-post";
const PostCard = async ({ post }: { post: Post }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const time = timePosts(post.created_at);
  const { data: likes } = await supabase
    .from("likes")
    .select()
    .eq("post_id", post.id);
  return (
    <div className="flex flex-col gap-3 p-2 md:p-4 rounded-xl w-full max-w-[500px] shadow-lg">
      <header className="flex justify-between w-full">
        <div className="flex gap-2">
          <img
            key={post.users?.avatar_url as string}
            src={post.users?.avatar_url as string}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className=" flex gap-2 ">
            <p className="text-xs font-bold">{post.users?.full_name}</p>
            <p className=" text-xs font-light">{time}</p>
          </div>
        </div>

        {user?.id === post.user_id && <OptionPost postId={post.id} />}
      </header>

      <div className="w-full h-auto">
        <img src={post?.image_url as string} alt="" className="w-full h-auto" />
      </div>

      <div className="flex w-full">
        {likes && (
          <BtnLike
            likes={likes}
            isLike={likes?.some((e) => e.user_id === user?.id)}
            postId={post.id}
            userId={user?.id as string}
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

      <div className=" text-md font-extralight">
        <p>{post?.content}</p>
      </div>
    </div>
  );
};

export default PostCard;

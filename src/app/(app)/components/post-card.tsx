import { Post } from "@/app/types/post";
import React from "react";
import { BiMessageRounded } from "react-icons/bi";
import BtnLike from "./btn-like";
import timePosts from "@/app/util/hora";
import OptionPost from "./option-post";
import ContentPost from "./content-post";

import Link from "next/link";
import InpuntComment from "./input-comment";
const PostCard = ({
  post,
  comment = true,
}: {
  post: Post;
  comment?: boolean;
}) => {
  const time = timePosts(post.created_at);

  return (
    <div className="flex flex-col gap-3 p-2 md:p-4 rounded-xl w-full shadow-lg">
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

        {post.isOwner && <OptionPost postId={post.id} />}
      </header>

      <ContentPost text={post?.content as string} />
      <div className="w-full h-auto">
        <img src={post?.image_url as string} alt="" className="w-full h-auto" />
      </div>

      <div className="flex w-full">
        {post.likes && (
          <BtnLike
            likes={post.likes}
            isLike={post.isLike}
            postId={post.id}
            owner_id={post.user_id}
          />
        )}
        <div className="flex flex-col justify-center items-center">
          <Link key={post.id} href={`/c/${post.id}`}>
            <div className=" text-3xl">
              <BiMessageRounded />
            </div>
          </Link>
          <span>{post.count_comment[0].count}</span>
        </div>
        <div className="grow"></div>
      </div>

      {comment && (
        <InpuntComment
          post_id={post.id}
          owner_id={post?.user_id}
          type="listPost"
        />
      )}
    </div>
  );
};

export default PostCard;

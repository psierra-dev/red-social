"use client";
import Modal from "@/app/components/Modal/modal";
import React from "react";
import PostClient from "./post-client";
import { Post } from "@/app/types/post";
import { Comment } from "@/app/types/comments";
import { BiX } from "react-icons/bi";
import { useRouter } from "next/navigation";

const WrapperModalPost = ({
  post,
  comments,
}: {
  post: Post;
  comments: Comment[];
}) => {
  const router = useRouter();
  return (
    <Modal type="route">
      <>
        <div className="w-screen max-w-[600px] max-h-[600px]  md:max-h-[1000px] md:h-[90%]  p-2 flex flex-col ">
          <div className="p-2 w-full bg-white dark:bg-black">
            <button onClick={() => router.back()} className="text-xl">
              <BiX />
            </button>
          </div>
          <div className="flex overflow-y-auto" style={{ height: "inherit" }}>
            <PostClient post={post as Post} comments={comments as Comment[]} />
          </div>
        </div>
      </>
    </Modal>
  );
};

export default WrapperModalPost;

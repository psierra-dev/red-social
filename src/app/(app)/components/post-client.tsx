"use client";
import { Post } from "@/app/types/post";
import React, { useState } from "react";
import PostCard from "./post-card";
import ListComment from "./list-comment";
import { Comment } from "@/app/types/comments";
import InpuntComment from "./input-comment";

const PostClient = ({
  post,
  comments,
}: {
  post: Post;
  comments: Comment[];
}) => {
  const [allComments, setAllComments] = useState(comments);

  const updateComments = (comment: Comment) => {
    setAllComments([comment, ...allComments]);
  };
  return (
    <div className="flex flex-col bg-white dark:bg-black grow ">
      <div className="grow overflow-auto">
        <PostCard post={post as Post} comment={false} />
        <ListComment comments={allComments} />
      </div>

      <div className="w-full flex items-center p-2 md:p-5">
        <InpuntComment
          post_id={post.id}
          owner_id={post?.user_id!}
          type="onePost"
          onAdd={updateComments}
        />
      </div>
    </div>
  );
};

export default PostClient;

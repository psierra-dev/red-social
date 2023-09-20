"use client";
import { Comment } from "@/app/types/comments";
import React, { useState } from "react";
import { Suspense } from "react";
import CardComment from "./card-comment";
import InpuntComment from "./input-comment";
// Opt out of caching for all data requests in the route segment

const ListComment = ({
  comments,
  post_id,
}: {
  comments: Comment[];
  post_id: string;
}) => {
  console.log("list comment", comments);
  const [allComment, setAllComment] = useState(comments);

  const handleAdd = (comment: Comment) => {
    console.log("handleAdd", comment);
    setAllComment([comment, ...allComment]);
  };
  return (
    <div className="bg-white flex flex-col w-full h-full p-5 rounded-xl">
      <h5 className="text-center text-sm font-medium">Comentarios</h5>

      <div className=" grow overflow-y-auto">
        {allComment?.map(({ content, users, id, created_at }) => (
          <CardComment
            key={id}
            user={users}
            comment={content}
            time={created_at}
          />
        ))}
      </div>

      <InpuntComment post_id={post_id} onAdd={handleAdd} />
    </div>
  );
};

export default ListComment;

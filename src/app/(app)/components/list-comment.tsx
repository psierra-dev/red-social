"use client";
import { Comment } from "@/app/types/comments";
import CardComment from "./card-comment";

const ListComment = ({ comments }: { comments: Comment[] }) => {
  return (
    <div className="bg-white dark:bg-black flex flex-col w-full h-auto p-5">
      <div className=" grow ">
        {comments?.map(({ content, users, id, created_at }) => (
          <CardComment
            key={id}
            user={users}
            comment={content}
            time={created_at}
          />
        ))}
      </div>
    </div>
  );
};

export default ListComment;

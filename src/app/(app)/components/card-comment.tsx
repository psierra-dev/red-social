import {User} from "@/app/types/user";
import timeComment from "@/app/utils/hora";
import React from "react";
const CardComment = ({
  user,
  comment,
  time,
}: {
  user?: User | null;
  comment: string;
  time?: string;
}) => {
  let tm;
  if (time) {
    tm = timeComment(time);
  }

  return (
    <div className="block my-2">
      <span className="inline">
        <span className=" text-xs font-bold dark:text-white">
          {user?.full_name}
        </span>
        {time && <span className=" text-xs font-thin text-gray-300">{tm}</span>}
        <span className=" text-xs dark:text-neutral-50 font-thin ml-2">
          {comment}
        </span>
      </span>
    </div>
  );
};

export default CardComment;

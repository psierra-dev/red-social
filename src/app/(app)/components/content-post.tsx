"use client";
import React, { useState } from "react";

const ContentPost = ({ text }: { text: string }) => {
  const [show, setShow] = useState(false);
  const shortText = text.slice(0, 100);
  const isLong = text.length > 99;
  console.log(isLong);
  return (
    <div className="p-2">
      <span className=" inline">
        <span className="inline text-sm font-thin ">
          {show || !isLong ? text : shortText}
        </span>
        {!show && isLong && (
          <span>
            ...
            <div className=" cursor-pointer inline">
              <span
                className="text-left before:content-[''] before:text-red-500 content-[''] after:content-['more'] after:text-gray-300"
                onClick={() => setShow(true)}
              ></span>
            </div>
          </span>
        )}
      </span>
    </div>
  );
};

export default ContentPost;

"use client";
import React from "react";

const Loader = ({
  w = "16",
  h = "16",
  color = "black",
  size = "4",
}: {
  w?: string;
  h?: string;
  color?: string;
  size?: string;
}) => {
  return (
    <div
      className={`w-${w} h-${h} border-t-${size} border-${color} dark:border-white border-solid border-opacity-50 rounded-full animate-spin`}
    ></div>
  );
};

export default Loader;

"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import PostService from "../services/post";

const usePost = () => {
  const supabase = createClientComponentClient();
  const postService = new PostService(supabase);

  const createPost = async (data: any) => {};
  return <div>usePost</div>;
};

export default usePost;

"use client";
import React from "react";
import PostService from "../services/post";
import { createClient } from "../utils/supabase/client";

const usePost = () => {
  const supabase = createClient();
  const postService = new PostService(supabase);

  const createPost = async (data: any) => {};
  return <div>usePost</div>;
};

export default usePost;

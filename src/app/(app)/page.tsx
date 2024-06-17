import React from "react";
import { redirect } from "next/navigation";
import ListPost from "./components/list-post";
import PostService from "../services/post";
import { Post } from "../types/post";
import { createClient } from "../utils/supabase/server";

export const dynamic = "force-dynamic";
const page = async () => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const postService = new PostService(supabase);
  const { posts } = await postService.allPosts();

  if (session === null) return redirect("/login");
  return (
    <div>
      <ListPost posts={posts as Post[]} />
    </div>
  );
};

export default page;

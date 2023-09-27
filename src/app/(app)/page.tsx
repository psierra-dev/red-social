import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ListPost from "./components/list-post";
import PostService from "../services/post";
import { Post } from "../types/post";
export const dynamic = "force-dynamic";
const page = async () => {
  const supabase = createServerComponentClient({ cookies });
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

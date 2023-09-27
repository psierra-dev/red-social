import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import PostService from "@/app/services/post";
const page = ({ params: { id } }: { params: { id: string } }) => {
  const supabase = createServerComponentClient({ cookies });

  const postService = new PostService(supabase);
  return <div>page</div>;
};

export default page;

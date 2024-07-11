import React, {Suspense} from "react";
import {redirect} from "next/navigation";
import ListPost from "./components/list-post";
import {createClient} from "../utils/supabase/server";
import {PostSkeleton} from "./components/skeletons";

export const dynamic = "force-dynamic";
const page = async () => {
  const supabase = createClient();
  const {
    data: {session},
  } = await supabase.auth.getSession();

  if (session === null) return redirect("/login");

  return (
    <div>
      <Suspense fallback={<PostSkeleton />}>
        <ListPost />
      </Suspense>
    </div>
  );
};

export default page;

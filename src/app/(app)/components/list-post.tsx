import React from "react";
import PostCard from "./post-card";
import {createClient} from "@/app/utils/supabase/server";
import PostService from "@/app/services/post";

const ListPost = async ({user_id}: {user_id?: string}) => {
  const supabase = createClient();
  const postService = new PostService(supabase);
  const {posts} = await postService.allPosts(user_id);

  if (posts.length === 0) {
    return (
      <section className="w-full h-full p-4 flex justify-center items-center">
        <div className="p-2 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold">Comparte fotos</h2>
          <p className=" text-xs font-thin">
            Cuando compartas fotos, aparecerán en tu perfil
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-2 flex flex-col gap-3 items-center mb-[70px] max-w-[500px] m-auto">
      {posts?.length > 0 &&
        posts.map((p: any) => <PostCard key={p?.id} post={p} />)}
    </section>
  );
};

export default ListPost;

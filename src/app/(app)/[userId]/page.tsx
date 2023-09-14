import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import PreviewPost from "./components/preview-post";
import { Post } from "@/app/types/post";
import { Database } from "@/app/types/database";

export const dynamic = "force-dynamic";
const page = async ({ params }: { params: { userId: string } }) => {
  console.log(params);
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: users, error } = await supabase
    .from("users")
    .select()
    .eq("id", params.userId);
  const { data: posts, error: errorPost } = await supabase
    .from("posts")
    .select("*, users(*), likes(*)")
    .eq("user_id", params.userId);
  console.log(posts);
  console.log(users);
  return (
    <section className="min-h-screen">
      <main className="flex flex-col min-h-full ">
        <div className="px-4 md:px-10 lg:mx-[100px]">
          <header className="flex justify-between md:justify-around bg-white p-3 rounded-md border-b-2">
            <div className="text-center">
              <p className="font-thin">Seguidores</p>
              <p className=" font-bold">200</p>
            </div>
            <div>
              <div className="w-[150px] h-[160px] md:w-[150px] ">
                {users && users[0].avatar_url ? (
                  <img
                    src={users[0]?.avatar_url}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                ) : null}
              </div>
              <p className="mt-2 text-center text-xl">
                {users && users[0].full_name}
              </p>
              <button className="bg-sky-500 w-full rounded-md p-2 mt-3 text-white">
                Seguir
              </button>
            </div>
            <div className="text-center">
              <p className=" font-thin">Seguidos</p>
              <p className=" font-bold">200</p>
            </div>
          </header>

          {posts !== null && <PreviewPost posts={posts as Post[]} />}
        </div>
      </main>
    </section>
  );
};

export default page;

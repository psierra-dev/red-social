import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import PreviewPost from "./components/preview-post";
import { Post } from "@/app/types/post";
import { Database } from "@/app/types/database";
import ButtonFollower from "../components/btn-follower";

export const dynamic = "force-dynamic";
const page = async ({ params }: { params: { userId: string } }) => {
  console.log(params);
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: users, error } = await supabase
    .from("users")
    .select()
    .eq("id", params.userId);
  const { data: posts, error: errorPost } = await supabase
    .from("posts")
    .select("*, users(*), likes(*)")
    .eq("user_id", params.userId)
    .order("created_at", { ascending: false });

  const { data: following } = await supabase
    .from("followers")
    .select()
    .eq("followers_id", params.userId);
  const { data: followed } = await supabase
    .from("followers")
    .select()
    .eq("owner_id", params.userId);
  console.log(following, "isFollower");
  console.log(posts);
  console.log(users);
  return (
    <section className="min-h-screen">
      <main className="flex flex-col min-h-full ">
        <div className="px-2 md:px-10 lg:mx-[100px]">
          <header className="flex justify-between md:justify-around bg-white p-3 rounded-md border-b-2">
            <div className="flex flex-col justify-end text-center">
              <p className="text-sm font-thin">Seguidores</p>
              <p className="text-sm font-bold">{following?.length}</p>
            </div>
            <div>
              <div className="w-[130px] h-[130px] md:w-[150px] md:h-[150px] ">
                {users && users[0].avatar_url ? (
                  <img
                    src={users[0]?.avatar_url}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                ) : null}
              </div>
              <p className="mt-2 text-center text-md">
                {users && users[0].full_name}
              </p>
              {user?.id !== params.userId && (
                <ButtonFollower
                  isFollowing={
                    following?.some((f) => f.owner_id === user?.id)
                      ? true
                      : false
                  }
                  followers_id={params.userId}
                  owner_id={user?.id as string}
                />
              )}
            </div>
            <div className="flex flex-col justify-end text-center">
              <p className="text-sm font-thin">Seguidos</p>
              <p className="text-sm font-bold">{followed?.length}</p>
            </div>
          </header>

          {posts !== null && <PreviewPost posts={posts as Post[]} />}
        </div>
      </main>
    </section>
  );
};

export default page;

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Post } from "@/app/types/post";
import { Database } from "@/app/types/database";
import PerfilInfo from "./components/perfil-info";
import PostService from "@/app/services/post";
import UserService from "@/app/services/user";
import FollowersService from "@/app/services/followers";
import ListPost from "../components/list-post";

export const dynamic = "force-dynamic";
const page = async ({ params }: { params: { userId: string } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) return redirect("/login");
  console.log(params);

  const postService = new PostService(supabase);
  const userService = new UserService(supabase);
  const followersService = new FollowersService(supabase);
  const { data: user } = await userService.getUser(params.userId);
  const { data: owner } = await userService.getUser();
  const { posts } = await postService.getPostPerfil(user?.id as string);

  const { following } = await followersService.getFollwing(user?.id as string);
  const { followed } = await followersService.getFollwed(owner?.id);
  const { followed: f } = await followersService.getFollwed(user?.id as string);

  return (
    <>
      {user && (
        <PerfilInfo
          following={following?.length as number}
          followed={f?.length as number}
          user={user}
          isOwner={owner?.id === user.id}
          isFollowing={
            followed?.some((f) => f.followers_id === user.id) ? true : false
          }
          perfil_id={user.id}
        />
      )}

      {posts.length >= 1 ? (
        <ListPost posts={posts as Post[]} />
      ) : (
        <section className="w-full h-full p-4 flex justify-center items-center">
          <div className="p-2 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold">Comparte fotos</h2>
            <p className=" text-xs font-thin">
              Cuando compartas fotos, aparecerán en tu perfil
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default page;

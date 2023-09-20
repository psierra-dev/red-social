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
  const { data: user, error } = await userService.getUser(params.userId);
  const { data: posts, error: errorPost } = await postService.getPostPerfil(
    params.userId
  );

  const { following } = await followersService.getFollwing(params.userId);
  const { followed } = await followersService.getFollwed(params.userId);

  return (
    <>
      {user && (
        <PerfilInfo
          following={following?.length as number}
          followed={followed?.length as number}
          user={user}
          isOwner={user.id === params.userId}
          isFollowing={
            following?.some((f) => f.owner_id === user.id) ? true : false
          }
          perfil_id={params.userId}
        />
      )}

      {posts !== null && <ListPost posts={posts as Post[]} />}
    </>
  );
};

export default page;

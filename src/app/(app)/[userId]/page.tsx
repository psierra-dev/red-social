import React, {Suspense} from "react";
import {redirect} from "next/navigation";
import {Post} from "@/app/types/post";
import PerfilInfo from "./components/perfil-info";
import PostService from "@/app/services/post";
import UserService from "@/app/services/user";
import FollowersService from "@/app/services/followers";
import ListPost from "../components/list-post";
import {createClient} from "@/app/utils/supabase/server";
import {PostSkeleton} from "../components/skeletons";

export const dynamic = "force-dynamic";
const page = async ({params}: {params: {userId: string}}) => {
  const supabase = createClient();
  const {
    data: {session},
  } = await supabase.auth.getSession();

  if (session === null) return redirect("/login");

  const userService = new UserService(supabase);
  const followersService = new FollowersService(supabase);
  const {data: user} = await userService.getUser(params.userId);
  const {data: owner} = await userService.getUser();

  const {following} = await followersService.getFollwing(user?.id as string);
  const {followed} = await followersService.getFollwed(owner?.id);
  const {followed: f} = await followersService.getFollwed(user?.id as string);

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

      <Suspense fallback={<PostSkeleton />}>
        <ListPost user_id={user?.id} />
      </Suspense>
    </>
  );
};

export default page;

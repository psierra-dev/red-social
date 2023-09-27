import { User } from "@/app/types/user";
import React from "react";
import ButtonFollower from "../../components/btn-follower";

const PerfilInfo = ({
  user,
  following,
  followed,
  isOwner,
  isFollowing,
  perfil_id,
}: {
  user: User | null;
  following: number;
  followed: number;
  isOwner: boolean;
  isFollowing: boolean;
  perfil_id: string;
}) => {
  console.log(isFollowing);
  console.log(isOwner, "owner");
  console.log(perfil_id, user?.id);
  return (
    <header className="flex justify-between md:justify-around bg-white p-3 rounded-md border-b-2">
      <div className="flex flex-col justify-end text-center">
        <p className="text-sm font-thin">Seguidores</p>
        <p className="text-sm font-bold">{following}</p>
      </div>
      <div>
        <div className="w-[130px] h-[130px] md:w-[150px] md:h-[150px] ">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt=""
              className="w-full h-full rounded-full"
            />
          ) : null}
        </div>
        <p className="mt-2 text-center text-md">{user?.full_name}</p>
        {!isOwner && (
          <ButtonFollower isFollowing={isFollowing} followers_id={perfil_id} />
        )}
      </div>
      <div className="flex flex-col justify-end text-center">
        <p className="text-sm font-thin">Seguidos</p>
        <p className="text-sm font-bold">{followed}</p>
      </div>
    </header>
  );
};

export default PerfilInfo;

"use client";
import { User } from "@/app/types/user";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BiUserCircle, BiX } from "react-icons/bi";
import ButtonFollower from "../../components/btn-follower";
import { MdSettings } from "react-icons/md";
import Modal from "@/app/components/Modal/modal";
import OptionMenu from "../../components/option-menu";
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
  const router = useRouter();
  const [setting, setSetting] = useState(false);

  return (
    <section className="flex justify-between md:justify-around bg-transparent p-3 rounded-md border-b-2">
      <div className="flex flex-col justify-end text-center pb-10">
        <p className="text-sm font-thin">Seguidores</p>
        <p className="text-sm font-bold">{following}</p>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <div className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] ">
          {user?.avatar_url ? (
            <Image
              width={100}
              height={100}
              src={user.avatar_url}
              alt="avatar"
              className="w-full h-full rounded-full"
            />
          ) : (
            <BiUserCircle className="h-full w-full" />
          )}
        </div>
        <p className="mt-2 text-center text-md">{user?.full_name}</p>

        <small className=" text-xs font-thin">@{user?.user_name}</small>
        {!isOwner && (
          <ButtonFollower isFollowing={isFollowing} followers_id={perfil_id} />
        )}

        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/account/edit")}
              className=" p-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 rounded-lg text-xs"
            >
              Editar perfil
            </button>
            <button className="block md:hidden text-xl" onClick={() => setSetting(true)}>
              <MdSettings />

              {setting && (
                <Modal
                  type="state"
                  onClose={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setSetting(false);
                  }}
                >
                  <div className="relative">
                    <header>
                      <button
                        className=" text-xl"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSetting(false);
                        }}
                      >
                        <BiX />
                      </button>
                    </header>
                    <OptionMenu style="" />
                  </div>
                </Modal>
              )}
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-end text-center pb-10">
        <p className="text-sm font-thin">Seguidos</p>
        <p className="text-sm font-bold">{followed}</p>
      </div>
    </section>
  );
};

export default PerfilInfo;

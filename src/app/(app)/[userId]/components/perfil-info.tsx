"use client";
import { User } from "@/app/types/user";
import React, { useState } from "react";
import ButtonFollower from "../../components/btn-follower";
import { useRouter } from "next/navigation";
import { MdSettings } from "react-icons/md";
import Modal from "@/app/components/Modal/modal";
import OptionMenu from "../../components/option-menu";
import { BiX } from "react-icons/bi";
import Image from "next/image";
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
        <div className="w-[130px] h-[130px] md:w-[150px] md:h-[150px] ">
          {user?.avatar_url ? (
            <Image
              width={100}
              height={100}
              src={user.avatar_url}
              alt="avatar"
              className="w-full h-full rounded-full"
            />
          ) : null}
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
            <button className=" text-xl" onClick={() => setSetting(true)}>
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

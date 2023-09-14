"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

const ButtonSignOut = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut();
        router.refresh();
      }}
    >
      cerrar sesion
    </button>
  );
};

export default ButtonSignOut;

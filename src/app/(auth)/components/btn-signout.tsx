"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";


const ButtonSignOut = () => {
  const supabase = createClient();
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

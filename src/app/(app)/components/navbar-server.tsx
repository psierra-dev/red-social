import { Database } from "@/app/types/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import NavBar from "./navbar";
import NavbarPhone from "./navbar-phone";
import NotificationService from "@/app/services/notification";
import NavbarContext from "./navbar-context";
const NavbarServer = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.auth.getUser();
  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("id", data && (data?.user?.id as string));
  const notiService = new NotificationService(supabase);
  const { count } = await notiService.count();
  console.log(user, "user");
  return (
    <>
      <NavbarContext user={user!} count={count!} />
    </>
  );
};

export default NavbarServer;

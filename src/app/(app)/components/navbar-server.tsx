import { Database } from "@/app/types/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import NotificationService from "@/app/services/notification";
import NavbarContext from "./navbar-context";
import UserService from "@/app/services/user";

const NavbarServer = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const userService = new UserService(supabase);
  const notiService = new NotificationService(supabase);

  const { data: user } = await userService.getUser();
  const { count } = await notiService.count();

  return (
    <>
      <NavbarContext user={user!} count={count!} />
    </>
  );
};

export default NavbarServer;

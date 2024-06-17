import { Database } from "@/app/types/database";
import React from "react";
import NotificationService from "@/app/services/notification";
import NavbarContext from "./navbar-context";
import UserService from "@/app/services/user";
import { createClient } from "@/app/utils/supabase/server";


const NavbarServer = async () => {
  const supabase = createClient();

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

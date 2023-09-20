import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import UserService from "../services/user";
import UserComponent from "./components/user";
import { Database } from "../types/database";
export const dynamic = "force-dynamic";
const page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const userService = new UserService(supabase);
  const user = await userService.getUser();
  return (
    <div>
      <UserComponent />
    </div>
  );
};

export default page;

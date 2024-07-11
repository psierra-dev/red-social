import React from "react";
import {redirect} from "next/navigation";

import FormSingleOn from "@/app/(auth)/components/form-single-on";
import UserService from "@/app/services/user";
import {createClient} from "@/app/utils/supabase/server";

export const dynamic = "force-dynamic";

const page = async () => {
  const supabase = createClient();

  const userService = new UserService(supabase);

  const {data: user, error} = await userService.getUser();

  if (user === null || error) {
    redirect("/login");
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {<FormSingleOn user={user} />}
    </div>
  );
};

export default page;

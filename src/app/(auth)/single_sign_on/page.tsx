import React from "react";
import FormSingleOn from "@/app/(auth)/components/form-single-on";
import UserService from "@/app/services/user";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
const page = async () => {
  const supabase = createClient();

  const userService = new UserService(supabase);

  const { data: user, error } = await userService.getUser();
  console.log(user, 'user')

  if (user === null || error) {
    redirect("/login");
  }

  if (user?.is_completed) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <FormSingleOn user={user} />
    </div>
  );
};

export default page;

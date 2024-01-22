import FormSingleOn from "@/app/(app)/components/form-single-on";
import UserService from "@/app/services/user";
import { Database } from "@/app/types/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic = "force-dynamic";
const page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const userService = new UserService(supabase);

  const { data: user, error } = await userService.getUser();

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

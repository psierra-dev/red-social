import FormSingleOn from "@/app/(app)/components/form-single-on";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
    error: errorUser,
  } = await supabase.auth.getUser();
  console.log(user);
  const { data, error } = await supabase
    .from("users")
    .select("is_completed")
    .eq("id", user?.id)
    .limit(1)
    .single();
  console.log(data, error, "data, single-sign-on");
  if (user === null || data === null) {
    redirect("/login");
  }

  if (data?.is_completed) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <FormSingleOn />
    </div>
  );
};

export default page;

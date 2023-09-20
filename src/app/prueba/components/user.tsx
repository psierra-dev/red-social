"use client";
import UserService from "@/app/services/user";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect } from "react";

const UserComponent = () => {
  const supabase = createClientComponentClient();
  const userService = new UserService(supabase);

  return <div>UserComponent</div>;
};

export default UserComponent;

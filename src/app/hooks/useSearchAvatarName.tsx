"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import UserService from "../services/user";

const useSearchAvatarName = (value: string) => {
  const [status, setStatus] = useState<"is_used" | "default" | "not_used">(
    "default"
  );
  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient();
  const userService = new UserService(supabase);

  useEffect(() => {
    const controller = new AbortController();
    const sign = controller.signal;
    if (value) {
      console.log("aqui");
      setLoading(true);
      supabase
        .from("users")
        .select("user_name")
        .eq("user_name", value)
        .limit(1)
        .abortSignal(sign)
        .then((data) => {
          if (data.error?.code === "20") {
            return;
          }
          if (data.data && data.data?.length > 0) {
            setStatus("is_used");
            setLoading(false);
          } else {
            setStatus("not_used");
            setLoading(false);
          }
        });
    } else {
      setStatus("default");
    }
    return () => controller.abort();
  }, [value]);

  return { status, loading };
};

export default useSearchAvatarName;

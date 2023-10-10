"use client";
import useChangeTheme from "@/app/hooks/useChangeTheme";
import React, { useEffect } from "react";

const DarkTheme = () => {
  const { theme } = useChangeTheme();

  useEffect(() => {
    console.log("theme", theme);
    if (theme === "dark") {
      window.document.querySelector("html")?.classList.add("dark");
    } else {
      window.document.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);

  return <></>;
};

export default DarkTheme;

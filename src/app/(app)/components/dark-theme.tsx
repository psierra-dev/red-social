"use client";

import React, { useEffect } from "react";

const DarkTheme = () => {
  useEffect(() => {
    let theme = window.localStorage.getItem("theme");
    console.log(theme, "theme");
    if (theme === "light") {
      theme = "light";
    } else if (
      theme === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      theme = "dark";
    } else {
      theme = "light";
    }
    if (theme === "dark") {
      window.document.querySelector("html")?.classList.add("dark");
    } else {
      window.document.querySelector("html")?.classList.remove("dark");
    }
  }, []);

  return <></>;
};

export default DarkTheme;

"use client";
import { useState } from "react";

const useChangeTheme = () => {
  const [theme, setTheme] = useState(() => {
    let theme = window.localStorage.getItem("theme");

    if (theme === "light") {
      return "light";
    } else if (
      theme === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    } else {
      return "light";
    }
  });

  const handleChange = () => {
    if (theme !== "dark") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      window.document.querySelector("html")?.classList.add("dark");
    } else {
      setTheme("light");
      window.localStorage.removeItem("theme");
      window.localStorage.setItem("theme", "light");
      window.document.querySelector("html")?.classList.remove("dark");
    }
  };

  return { handleChange, theme, setTheme };
};

export default useChangeTheme;

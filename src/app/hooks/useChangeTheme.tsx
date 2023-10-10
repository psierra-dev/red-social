"use client";
import { useEffect, useState } from "react";

const useChangeTheme = () => {
  const [themeChange, setThemeChange] = useState("dark");

  useEffect(() => {
    let theme = window.localStorage.getItem("theme");
    console.log(theme, "theme");
    if (theme === "light") {
      setThemeChange("light");
    } else if (
      theme === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setThemeChange("dark");
    } else {
      theme = "light";
    }
    if (theme === "dark") {
      window.document.querySelector("html")?.classList.add("dark");
    } else {
      window.document.querySelector("html")?.classList.remove("dark");
    }
  }, []);

  const handleChange = () => {
    if (themeChange !== "dark") {
      setThemeChange("dark");
      window.localStorage.setItem("theme", "dark");
      window.document.querySelector("html")?.classList.add("dark");
    } else {
      setThemeChange("light");
      window.localStorage.removeItem("theme");
      window.localStorage.setItem("theme", "light");
      window.document.querySelector("html")?.classList.remove("dark");
    }
  };

  return { handleChange, themeChange };
};

export default useChangeTheme;

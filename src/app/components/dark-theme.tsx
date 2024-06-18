"use client"
import { useEffect } from "react";

const DarkTheme = () => {
    useEffect(() => {
      if (
        localStorage.theme === "dark" ||
        ((!("theme" in localStorage) || localStorage.theme === "system") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
        if (localStorage.theme === "system") {
          localStorage.theme = "system";
        } else {
          localStorage.theme = "dark";
        }
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
    }, []);
  
    return <></>;
  };

  export default DarkTheme
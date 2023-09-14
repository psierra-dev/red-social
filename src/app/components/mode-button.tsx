"use client";
import React, { useEffect, useState } from "react";

const ModeButton = () => {
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document?.querySelector("html")?.classList.add("dark");
    } else {
      document?.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <button
      className="bg-black text-white dark:bg-white dark:text-black"
      onClick={handleChangeTheme}
    >
      Cambiar theme
    </button>
  );
};

export default ModeButton;

"use client";
import useChangeTheme from "@/app/hooks/useChangeTheme";

const BtnTema = () => {
  const { handleChange, theme } = useChangeTheme();
  const isDark = theme === "dark" ? true : false;

  return (
    <div
      className=" inline-block cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        handleChange();
      }}
    >
      <label
        className={`shadow cursor-pointer-xl w-10 h-5 rounded-xl inline-block relative before:content[''] before:block before:w-5 before:h-5  before:rounded-full before:absolute bg-gray-400 ${
          isDark
            ? "before:translate-x-5  before:bg-black"
            : "before:bg-gray-200"
        }`}
      ></label>
    </div>
  );
};

export default BtnTema;

import useTheme from "@/app/hooks/useTheme";
import { MdComputer, MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const IconTheme = {
  Dark: <MdDarkMode />,
  Light: <MdOutlineLightMode />,
  System: <MdComputer />,
};

const CardMenuTheme = ({
  isActive,
  onSelect,
  type,
}: {
  isActive: boolean;
  onSelect: () => void;
  type: "Dark" | "Light" | "System";
}) => {
  const Icon = IconTheme[type];
  return (
    <div
      className={`w-full p-1 flex items-center text-base gap-2 ${
        isActive
          ? "text-blue-600 dark:text-blue-400 "
          : "text-neutral-900 dark:text-neutral-100"
      } dark:hover:bg-slate-800 font-normal cursor-pointer`}
      onClick={onSelect}
    >
      <span className="text-base">{Icon}</span>
      <span className=" text-xs">{type}</span>
    </div>
  );
};
const MenuTheme = () => {
  const { theme, changeTheme } = useTheme();
  return (
    <div className=" w-[140px] bg-white dark:bg-neutral-800 dark:text-white absolute -top-28 right-0 py-2 shadow-md rounded-md z-20">
      <CardMenuTheme
        type="Light"
        isActive={theme === "light"}
        onSelect={() => changeTheme("light")}
      />
      <CardMenuTheme
        type="Dark"
        isActive={theme === "dark"}
        onSelect={() => changeTheme("dark")}
      />
      <CardMenuTheme
        type="System"
        isActive={theme === "system"}
        onSelect={() => changeTheme("system")}
      />
    </div>
  );
};

export default MenuTheme;
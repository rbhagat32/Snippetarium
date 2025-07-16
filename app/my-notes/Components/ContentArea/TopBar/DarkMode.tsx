"use client";

import { useGlobalContext } from "@/Context";
function DarkMode() {
  const {
    darkModeObject: { darkMode, setDarkMode },
  } = useGlobalContext();

  function handleClickedDarkMode(index: number) {
    const updateDarkModeObject = darkMode.map((item, i) => {
      if (i === index) {
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });
    setDarkMode(updateDarkModeObject);
  }
  return (
    <div
      className={` ${darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"} flex h-[36px] w-[74px] items-center gap-2 rounded-3xl pl-[5px]`}
    >
      {darkMode.map((item, index) => {
        return (
          <div
            className={` ${item.isSelected ? "bg-rose-600 text-white" : "text-rose-600"} left-1 top-[4px] flex h-7 w-7 cursor-pointer select-none items-center justify-center rounded-full p-1`}
            key={index}
            onClick={() => handleClickedDarkMode(index)}
          >
            {item.icon}
          </div>
        );
      })}
    </div>
  );
}

export default DarkMode;

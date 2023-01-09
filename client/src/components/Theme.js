import React from "react";
import { useState, useEffect } from "react";
import { MdWbSunny } from "react-icons/md";
import { HiMoon } from "react-icons/hi";
function Theme() {
  // Dark : Light Theme toggle

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div
      className="absolute top-5 left-10  bg-[#2926A7] text-white dark:bg-yellow-200 dark:text-orange-500 px-5 py-1 cursor-pointer rounded-full"
      onClick={handleThemeSwitch}
    >
      <HiMoon className="text-2xl dark:hidden " />
      <MdWbSunny className="text-2xl hidden dark:flex " />
    </div>
  );
}

export default Theme;

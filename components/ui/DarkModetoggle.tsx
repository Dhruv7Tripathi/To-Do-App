import { useState, useEffect } from "react";
import React from "react";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
    else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme ", "dark");
    }
    else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme ", "light");
    }
  };
  return (
    <button
      onClick={toggleDarkMode}
      className="absolute top-0 right-0 m-4 p-2 text-white bg-black bg-opacity-50 rounded-full"
    >
      {/* {isDarkMode ? (
        <SunIcon className="w-6 h-6" />
      ) : (
        <MoonIcon className="w-6 h-6" />
      )} */}
      {isDarkMode ? "🌞" : "🌙"}
    </button>
  );
}
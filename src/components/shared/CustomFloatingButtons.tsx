'use client'

import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { CgDarkMode } from "react-icons/cg";
import { CustomFloatingButtonsSkeleton } from "./CustomFloatingButtonsSkeleton";
import { useTheme } from "next-themes";

type ThemeOption = "light" | "dark" | "system";

const THEME_OPTIONS: { label: string; value: ThemeOption }[] = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

export const CustomFloatingButtons = () => {
  const [isClient, setIsClient] = React.useState(false);

  const [showTooltip, setShowTooltip] = React.useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = React.useState(false);

  const { theme, setTheme, resolvedTheme } = useTheme();

  const themeButtonRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!isThemeMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (themeButtonRef.current && !themeButtonRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isThemeMenuOpen]);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleThemeSelection = (value: ThemeOption) => {
    setTheme(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme-preference", value);
      if (value === "light" || value === "dark") {
        localStorage.setItem("theme", value);
      }
    }
    setIsThemeMenuOpen(false);
  };

  if (!isClient) return <CustomFloatingButtonsSkeleton />;

  const isSystemTheme = theme === "system";
  const resolved = isSystemTheme ? resolvedTheme : theme;

  return (
    <>
      {/* FLOATING THEME BUTTON */}
      <div
        className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2"
        ref={themeButtonRef}
      >
        <button
          onClick={() => setIsThemeMenuOpen((prev) => !prev)}
          className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-400 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 border border-gray-300 dark:border-gray-800"
          aria-label="Toggle theme options"
        >
          <CgDarkMode />
        </button>

        {isThemeMenuOpen && (
          <div className="mt-2 w-36 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-950">
            <span className="block px-2 pb-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Theme
            </span>
            <div className="flex flex-col gap-1">
              {THEME_OPTIONS.map((option) => {
                const isActive = option.value === "system" ? isSystemTheme : !isSystemTheme && resolved === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleThemeSelection(option.value)}
                    className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "border-gray-900 bg-gray-900 text-gray-100 dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* FLOATING SOCIAL BUTTONS */}
      <div className="fixed bottom-6 items justify-end right-6 z-50 flex gap-4 md:flex-col left-6 mx-auto md:left-auto md:gap-2">
        <div className="relative group">
          <a
            href="mailto:derkysan19@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-400 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 border border-gray-300 dark:border-gray-800`}
            aria-label="Enviar email"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          {/* TOOLTIP */}
          {showTooltip && (
            <span className="
              h-7 flex items-center justify-center absolute right-12 top-0 bottom-0 my-auto px-3 py-1 rounded-lg bg-gray-900 text-white text-sm whitespace-nowrap shadow-md z-50
              animate-fadeIn
            ">
              derkysan19@gmail.com
            </span>
          )}
        </div>
        {/* <button
          onClick={() => setIsContactOpen(true)}
          className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-400 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 border border-gray-300 dark:border-gray-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button> */}
        <a
          href="https://www.linkedin.com/in/derkysan/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-400 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 border border-gray-300 dark:border-gray-800"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://github.com/Derkysan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-400 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 border border-gray-300 dark:border-gray-800"
        >
          <FiGithub />
        </a>
      </div>
    </>
  );
};

'use client'

import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { CgDarkMode } from "react-icons/cg";
import { CustomFloatingButtonsSkeleton } from "./CustomFloatingButtonsSkeleton";

interface Props {
  isContactOpen: boolean;
  setIsContactOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleTheme: () => void;
}

export const CustomFloatingButtons = ({ setIsContactOpen, handleTheme }: Props) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <CustomFloatingButtonsSkeleton />;

  return (
    <>
      {/* FLOATING THEME BUTTON */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2">
        <button
          onClick={handleTheme}
          className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-400 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 border border-gray-300 dark:border-gray-800"
        >
          <CgDarkMode />
        </button>
      </div>

      {/* FLOATING SOCIAL BUTTONS */}
      <div className="fixed bottom-6 items justify-end right-6 z-50 flex gap-4 md:flex-col left-6 mx-auto md:left-auto md:gap-2">
        <button
          onClick={() => setIsContactOpen(true)}
          className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-400 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 border border-gray-300 dark:border-gray-800 hover:border-orange-500 hover:text-orange-500 dark:hover:border-orange-500 dark:hover:text-orange-500"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
        <a
          href="https://www.linkedin.com/in/derkysan/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-400 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 border border-gray-300 dark:border-gray-800 hover:border-[#0a66c2] hover:text-[#0a66c2] dark:hover:border-[#0a66c2] dark:hover:text-[#0a66c2]"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://github.com/Derkysan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-400 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 border border-gray-300 dark:border-gray-800 hover:border-[#6e5494] hover:text-[#6e5494] dark:hover:border-[#6e5494] dark:hover:text-[#6e5494]"
        >
          <FiGithub />
        </a>
      </div>
    </>
  );
};

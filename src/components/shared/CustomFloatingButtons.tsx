'use client'

import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { CustomFloatingButtonsSkeleton } from "./CustomFloatingButtonsSkeleton";
import { motion } from "motion/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const CustomFloatingButtons = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <CustomFloatingButtonsSkeleton />;

  return (
    <>
      {/* FLOATING THEME BUTTON */}
      {/* <div className="fixed top-6 right-6 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 text-gray-800 dark:text-gray-400 rounded-full"
              aria-label="Toggle theme"
            >
              <motion.div
                key={iconKey}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                  duration: 0.6
                }}
              >
                {theme === "dark" ? <CgShapeCircle /> : <PiSunDimBold />}
              </motion.div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Cambiar tema a {theme === "dark" ? "claro" : "oscuro"}</p>
          </TooltipContent>
        </Tooltip>
      </div> */}

      {/* FLOATING SOCIAL BUTTONS */}
      <div className="fixed bottom-6 items justify-end right-6 z-50 flex gap-4 md:flex-col left-6 mx-auto md:left-auto md:gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.a
              href="mailto:derkysan19@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-10 h-10 text-gray-800 dark:text-gray-400 rounded-full`}
              aria-label="Enviar email"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 10
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.a>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Enviar email a derkysan19@gmail.com</p>
          </TooltipContent>
        </Tooltip>
        {/* <button
          onClick={() => setIsContactOpen(true)}
          className="flex items-center justify-center w-10 h-10 text-gray-800 dark:text-gray-400 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button> */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.a
              href="https://www.linkedin.com/in/derkysan/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 text-gray-800 dark:text-gray-400 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 10
              }}
            >
              <FaLinkedinIn />
            </motion.a>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Visitar perfil de LinkedIn</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.a
              href="https://github.com/Derkysan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 text-gray-800 dark:text-gray-400 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 10
              }}
            >
              <FiGithub />
            </motion.a>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Visitar perfil de GitHub</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
};

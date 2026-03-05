'use client'

import React from "react";

import { motion } from "motion/react";

import { useTheme } from "@/providers/theme-provider";
import { Skeleton } from "@/components/ui/skeleton";
// import { SanLogo, SanLogoBlack } from "../../../public";

interface CustomLogoProps {
  active?: boolean;
}

export const CustomLogo: React.FC<CustomLogoProps> = ({ active = false }) => {
  const [isClient, setIsClient] = React.useState(false);
  const { theme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    setIsClient(true); // Establece el estado después de que se haya renderizado en el cliente
  }, []);

  if (!isClient) return <Skeleton className="w-[40px] h-[50px] rounded" />; // Skeleton con las mismas dimensiones del logo

  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = activeTheme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1
      }}
    >
      <motion.div
        initial={false}
        animate={{ scale: active ? 1.5 : 1.25, rotate: active ? -2 : 0 }}
        whileHover={{ scale: 1.5, rotate: -2 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="bg-background/80 backdrop-blur-2xl p-2 rounded-lg shadow-3xl shadow-gray-300/50 dark:shadow-gray-950/50"
      >
        {isDark
          ? <img src={'/assets/svg/san.svg'} width={40} height={45} alt={"San"} className="transition-all duration-200 ease-in-out" />
          : <img src={'/assets/svg/san.svg'} width={40} height={45} alt={"San"} className="transition-all duration-200 ease-in-out" />
          // : <img src={'/assets/svg/san-black.svg'} width={40} height={45} alt={"San"} className="transition-all duration-200 ease-in-out" />
        }
      </motion.div>
    </motion.div>
  );
};

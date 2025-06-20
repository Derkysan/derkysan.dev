'use client'

import React from "react";

import Image from "next/image";
import { motion } from "framer-motion";

import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
// import { SanLogo, SanLogoBlack } from "../../../public";


export const CustomLogo = () => {
  const [isClient, setIsClient] = React.useState(false);
  const { theme } = useTheme();

  React.useEffect(() => {
    setIsClient(true); // Establece el estado después de que se haya renderizado en el cliente
  }, []);

  if (!isClient) return <Skeleton className="w-[40px] h-[50px] rounded" />; // Skeleton con las mismas dimensiones del logo

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
      <div className="hover:scale-110 hover:-rotate-3 transition-all duration-200 ease-in-out">
        {theme === 'dark'
          ? <Image src={'/assets/svg/san.svg'} width={40} height={45} alt={"San"} className="transition-all duration-200 ease-in-out" />
          : <Image src={'/assets/svg/san-black.svg'} width={40} height={45} alt={"San"} className="transition-all duration-200 ease-in-out" />
        }
      </div>
    </motion.div>
  );
};

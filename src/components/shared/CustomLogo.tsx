
import React from "react";

import { motion } from "motion/react";

import { useTheme } from "@/providers/theme-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
// import { SanLogo, SanLogoBlack } from "../../../public";

interface CustomLogoProps {
  active?: boolean;
  contained?: boolean;
}

export const CustomLogo: React.FC<CustomLogoProps> = ({
  active = false,
  contained = false,
}) => {
  const [isClient, setIsClient] = React.useState(false);
  const { theme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    setIsClient(true); // Establece el estado después de que se haya renderizado en el cliente
  }, []);

  if (!isClient) return <Skeleton className="w-[40px] h-[50px] rounded" />; // Skeleton con las mismas dimensiones del logo

  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = activeTheme === "dark";
  const restingScale = contained ? 1 : 1;
  const activeScale = contained ? 1 : 1;
  const hoverScale = contained ? 1 : 1.1;
  const logoWidth = contained ? 30 : 40;
  const logoHeight = contained ? 34 : 45;

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
      className={cn(contained && "flex h-full w-full items-center justify-center")}
    >
      <motion.div
        initial={false}
        animate={{ scale: active ? activeScale : restingScale }}
        whileHover={{ scale: hoverScale }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "flex items-center justify-center",
          contained ? "p-1.5" : "p-2"
        )}
      >
        {isDark
          ? <img src={'/assets/svg/san.svg'} width={logoWidth} height={logoHeight} alt={"San"} className="block transition-all duration-200 ease-in-out" />
          : <img src={'/assets/svg/san.svg'} width={logoWidth} height={logoHeight} alt={"San"} className="block transition-all duration-200 ease-in-out" />
          // : <img src={'/assets/svg/san-black.svg'} width={40} height={45} alt={"San"} className="transition-all duration-200 ease-in-out" />
        }
      </motion.div>
    </motion.div>
  );
};


import React from "react";

import { motion } from "motion/react";

import { useTheme } from "@/providers/theme-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
// import { SanLogo, SanLogoBlack } from "../../../public";

const LOGO_LOADED_KEY = "logo_loaded";
let logoHasLoaded = typeof sessionStorage !== "undefined" && sessionStorage.getItem(LOGO_LOADED_KEY) === "1";

interface CustomLogoProps {
  active?: boolean;
  contained?: boolean;
}

export const CustomLogo: React.FC<CustomLogoProps> = ({
  active = false,
  contained = false,
}) => {
  const [isClient, setIsClient] = React.useState(logoHasLoaded);
  const skipAnimation = React.useRef(logoHasLoaded);
  const { theme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (!logoHasLoaded) {
      logoHasLoaded = true;
      sessionStorage.setItem(LOGO_LOADED_KEY, "1");
    }
    setIsClient(true);
  }, []);

  if (!isClient) return <Skeleton className="w-[40px] h-[50px] rounded" />;

  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = activeTheme === "dark";
  const restingScale = contained ? 1 : 1;
  const activeScale = contained ? 1 : 1;
  const hoverScale = contained ? 1 : 1.1;
  const logoWidth = contained ? 28 : 40;
  const logoHeight = contained ? 34 : 45;

  return (
    <motion.div
      initial={skipAnimation.current ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={skipAnimation.current ? { duration: 0 } : {
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

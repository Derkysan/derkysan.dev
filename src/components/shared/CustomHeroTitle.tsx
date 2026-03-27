
import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/providers/theme-provider";
import { Skeleton } from "@/components/ui/skeleton";

export const CustomHeroTitle = () => {
  const [isClient, setIsClient] = React.useState(false);
  const { theme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return (
    <div className="mb-5">
      <Skeleton className="w-[240px] h-[36px] rounded" />
    </div>
  );

  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = activeTheme === "dark";

  return (
    <motion.h1
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="tracking-wider text-3xl uppercase mb-3 flex-wrap"
    >
      Hola, Soy{" "}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        className={isDark ? `text-gradient-light` : "text-black"}
      >
        Derky Sánchez
      </motion.span>
    </motion.h1>
  );
};

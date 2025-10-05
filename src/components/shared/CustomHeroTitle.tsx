'use client'

import React from "react";
import { useTheme } from "next-themes";
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
    <h1 className="flex gap-2 text-3xl uppercase mb-5">
      Hola, Soy <span className={isDark ? `text-gradient-light` : "text-black"}>Derky</span>
    </h1>
  );
};

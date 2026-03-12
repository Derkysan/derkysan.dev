
import React from "react";
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
    <h1 className="tracking-widest text-3xl uppercase mb-3 bg-background flex-wrap">
      Hola, Soy <span className={isDark ? `text-gradient-light` : "text-black"}>Derky Sánchez</span>
    </h1>
  );
};

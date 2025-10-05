import React, { PropsWithChildren } from "react";
import { useTheme } from "next-themes";

import { Skeleton } from "@/components/ui/skeleton"

export const CustomGradientText = ({ children }: PropsWithChildren) => {
  const [isClient, setIsClient] = React.useState(false);
  const { theme, resolvedTheme } = useTheme();

  React.useEffect(() => {
      setIsClient(true); // Establece el estado después de que se haya renderizado en el cliente
    }, []);
  
    if (!isClient) return <Skeleton className="w-[100px] h-9 rounded" />;

  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = activeTheme === "dark";

  return (
    <span className={isDark ? `${['text-gradient-light']}` : "text-black"}>{children}</span>
  );
};

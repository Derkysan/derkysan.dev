import React, { PropsWithChildren } from "react";
import { useTheme } from "next-themes";

import { Skeleton } from "@/components/ui/skeleton"

export const CustomGradientText = ({ children }: PropsWithChildren) => {
  const [isClient, setIsClient] = React.useState(false);
  const { theme } = useTheme();

  React.useEffect(() => {
      setIsClient(true); // Establece el estado después de que se haya renderizado en el cliente
    }, []);
  
    if (!isClient) return <Skeleton className="w-[100px] h-9 rounded" />;

  return <span className={
    theme === 'dark'
      ? `${['text-gradient-light']}`
      : 'text-black'
  }>{children}</span>;
};

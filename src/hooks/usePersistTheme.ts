
import React from "react";
import { useTheme } from "@/providers/theme-provider";

export const usePersistTheme = () => {
  const { theme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (!theme || (theme === 'system' && !resolvedTheme)) {
      return;
    }

    const activeTheme = theme === 'system' ? resolvedTheme : theme;

    if (activeTheme && typeof window !== 'undefined') {
      localStorage.setItem('theme', activeTheme);
      localStorage.setItem('theme-preference', theme);
    }

    if (activeTheme) {
      document.documentElement.classList.toggle('dark', activeTheme === 'dark');
      document.cookie = `theme=${activeTheme}; path=/; max-age=${60 * 60 * 24 * 365}`;
    }
  }, [theme, resolvedTheme]);
};

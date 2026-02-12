'use client'

import React, { PropsWithChildren } from "react";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";

type ProvidersProps = PropsWithChildren<{
  initialTheme?: 'light' | 'dark';
}>;

export const Providers = ({ children, initialTheme }: ProvidersProps) => {
  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60000, // 1 min
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  })
  return (
    <QueryClientProvider client={queryClient}> 
      <TooltipProvider>   
        <ThemeProvider
          attribute="class"
          defaultTheme={initialTheme ?? "dark"}
          forcedTheme="dark"
          enableSystem={false}
          storageKey="theme"
        >
          {children}
          <Toaster />
        </ThemeProvider>  
      </TooltipProvider>
    </QueryClientProvider> 
  );
};

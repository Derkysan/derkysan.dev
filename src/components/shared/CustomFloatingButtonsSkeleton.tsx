'use client'

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const CustomFloatingButtonsSkeleton = () => {
  return (
    <>
      {/* FLOATING THEME BUTTON SKELETON */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2">
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>

      {/* FLOATING SOCIAL BUTTONS SKELETON */}
      <div className="fixed bottom-6 items justify-center right-6 z-50 flex gap-4 md:flex-col left-6 mx-auto md:left-auto md:gap-2">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
    </>
  );
};

'use client'

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const CustomTechStackSkeleton = () => {
  return (
    <div className="flex gap-3 items-center">
      {Array.from({ length: 7 }).map((_, index) => (
        <Skeleton 
          key={index} 
          className="w-[24px] h-[24px] rounded-md" 
        />
      ))}
    </div>
  );
};

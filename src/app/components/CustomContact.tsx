import React from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import { HiOutlineEnvelope } from "react-icons/hi2";

interface Props {
  onClick: () => void
}

export const CustomContact = ({ onClick }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Tooltip open={isOpen}>
      <TooltipTrigger
        className={`flex items-center justify-center border border-gray-400 w-10 h-10 rounded-full text-gray-500 hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-all duration-200 ease-in-out transform hover:scale-110`}
        disabled={false} 
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={onClick}>
        <HiOutlineEnvelope />
      </TooltipTrigger>
      <TooltipContent className={`text-xs`}>
        Contactar
      </TooltipContent>
    </Tooltip>
  );
};

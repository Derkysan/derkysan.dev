import React from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import { FaWhatsapp } from "react-icons/fa6";

export const CustomWhatsAppBtn = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    
    <Tooltip open={isOpen}>
      <TooltipTrigger
        className={`flex items-center justify-center border-2 w-10 h-10 rounded-full text-gray-500 hover:border-black hover:text-black dark:hover:border-[#25D366] dark:hover:text-[#25D366] transition-all duration-200 ease-in-out transform hover:scale-110`}
        disabled={false} 
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => {
          // handleCopy();
        }}>
        <FaWhatsapp />
      </TooltipTrigger>
      <TooltipContent className={`text-xs`}>
        Enviar mensaje por WhatsApp
      </TooltipContent>
    </Tooltip>
  );
};

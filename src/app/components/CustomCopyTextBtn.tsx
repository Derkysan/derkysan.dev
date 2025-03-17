'use client'

import React from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import { FaRegCopy } from "react-icons/fa6";

interface Props {
  textToCopy: string
}

export const CustomCopyTextBtn = ({ textToCopy }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [color, setColor] = React.useState('');
  const [copyText, setCopyText] = React.useState("Copiar correo");

  React.useEffect(() => {
    // console.log('color:', color)
  }, [color]);

  React.useEffect(() => {
    setTimeout(() => { 
      setCopyText('Copiar correo')!
    }, 1000);
  }, [copyText]);

  const handleCopy = () => {    
    setIsOpen(true);
    navigator.clipboard.writeText(textToCopy)
      .then(() => {        
        setColor('bg-success');
        setCopyText("Copiado!");
        setTimeout(() => {
          setIsOpen(false);
          setCopyText("Copiar");
          setColor('bg-primary');
        }, 750)
      })
      .catch(err => {
        setColor('bg-primary');
        setCopyText('Error al copiar');
        console.error('Error al copiar el texto:', err);
      });
  }

  return (
    <Tooltip open={isOpen}>
      <TooltipTrigger
        className={`flex items-center justify-center border border-gray-400 w-10 h-10 rounded-full text-gray-500 hover:border-black hover:text-black dark:hover:border-[#ee7d00] dark:hover:text-[#ee7d00] transition-all duration-200 ease-in-out transform hover:scale-110`}
        disabled={false} 
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => {
          handleCopy();
        }}>
        <FaRegCopy />
      </TooltipTrigger>
      <TooltipContent className={`text-xs`}>
        <p>{copyText}</p>
      </TooltipContent>
    </Tooltip>
  );
};

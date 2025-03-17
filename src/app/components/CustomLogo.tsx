'use client'

import React from "react";

import Image from "next/image";

import { useTheme } from "next-themes";
// import { SanLogo, SanLogoBlack } from "../../../public";


export const CustomLogo = () => {
  const [isClient, setIsClient] = React.useState(false);
  const { theme } = useTheme();

  React.useEffect(() => {
    setIsClient(true); // Establece el estado después de que se haya renderizado en el cliente
  }, []);

  if (!isClient) return null; // Evita el renderizado hasta que sea el cliente

  return theme === 'dark'
  ? <Image src={'/assets/svg/san.svg'} width={40} height={45} alt={"San"} className="transition-all duration-200 ease-in-out" />
  : <Image src={'/assets/svg/san-black.svg'} width={40} height={45} alt={"San"} className="transition-all duration-200 ease-in-out" />;
};

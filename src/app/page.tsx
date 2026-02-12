'use client'

import React from "react";
import { useTheme } from "@/providers/theme-provider";

import { CustomContact, CustomContactDialog, CustomCopyTextBtn, CustomFloatingButtons, CustomGradientText, CustomHeroTitle, CustomLogo, CustomSplitText, CustomTechStack } from "@/components/shared";

import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";



export default function Page() {
  const [isContactOpen, setIsContactOpen] = React.useState<boolean>(false);
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

  // const [isClient, setIsClient] = React.useState(false);
  
  // React.useEffect(() => {
  //     setIsClient(true); // Establece el estado después de que se haya renderizado en el cliente
  //   }, []);
  
  // if (!isClient) return <div className="w-screen h-screen flex flex-1 items-center justify-center">Loading...*</div>;
  // if (!isClient) return (
  //   <div className="w-screen h-screen flex items-center justify-center">
  //     <svg className="animate-spin h-10 w-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  //       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
  //       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
  //     </svg>
  //   </div>
  // );
  

  return (
    <div className="w-full min-h-svh flex flex-col relative">
      {/* INTERACTIVE DOT GRID BACKGROUND */}
      {/* <InteractiveDotGrid 
        colorInicialDark="#44403c"
        colorInicialLight="#b3b1b1"
        opacidadInicial={0.25}
      /> */}
      
      {/* CONTACT DIALOG */}
      <CustomContactDialog isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} />

      {/* FLOATING BUTTONS */}
      <CustomFloatingButtons />

      {/* FLOATING THEME TOGGLE BUTTON */}
      <div className="flex flex-grow relative z-10">
        <div className="flex flex-col container mx-auto">
          {/* [calc(100vh-7rem)] */}
          <div className="w-full flex flex-grow items-center justify-center px-5 py-8 min-h-svh">
            <div className="lg:w-[45%] max-w-4xl">
              <div className="mb-8 flex justify-start">
                <CustomLogo />
              </div>
              <CustomHeroTitle />
              <div className="lg:text-left text-sm font-light mb-10 leading-loose">
                <CustomSplitText text={"Desarrollador de software especializado en tecnologías frontend y backend. Con experiencia en React, TypeScript y frameworks modernos, desarrollo aplicaciones web escalables y de alto rendimiento, centradas en ofrecer experiencias de usuario fluidas y soluciones backend robustas."} />
              </div>

              <div className="flex flex-wrap gap-4 items-stretch mb-10">
                <span className={`flex items-center text-sm uppercase tracking-wide`}>
                  <CustomGradientText>Tech Stack</CustomGradientText>
                </span>
                <div className="border-l border-gray-600 hidden md:flex"></div>
                <CustomTechStack />
              </div>
            {/* <div className="border">Contactar</div> */}
            </div>
          </div>
          {/* <div className="w-full h-[0.5px] border-none bg-gradient-to-r from-[#f8af00]/20 to-[#ee7d00]/40"></div> */}
        </div>
      </div>

      <div className="hidden">
        <div className="container mx-auto">            
          <div className="grid grid-cols-1 xl:grid-cols-2 items-center justify-center h-80 px-5 py-5 xl:gap-10">
            <div className="text-center xl:text-end">
              <h3 className={`text-4xl font-thin uppercase`}>Tienes algún <br/>proyecto en mente, <br/><CustomGradientText>conversemos</CustomGradientText>!</h3>
            </div>
            <div className="flex justify-center xl:justify-start">
              <div className="flex items-center h-14 border-2 border-gray-600 p-5 pr-2 rounded-full gap-1">
                <span className="dark:text-gray-400 text-lg mr-10">derkysan19@gmail.com</span>
                <CustomCopyTextBtn textToCopy="derkysan19@gmail.com" />
                <CustomContact onClick={() => setIsContactOpen(true)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-gray-400 dark:border-gray-700 border-t hidden">
          <div className="container mx-auto">   
            <div className="flex items-center justify-between h-28 px-5">
              <span className="text-xs text-gray-600 dark:text-gray-400 italic">© {new Date().getFullYear()} All rights reserved.</span>

              <div className="flex items-center gap-6 text-gray-600">
                <a href="https://www.linkedin.com/in/derkysan/" target="_blank" className="flex items-center justify-center hover:border-2 w-8 h-8 rounded-full text-gray-500 hover:border-[#0a66c2] hover:text-[#0a66c2] transition-all duration-300 ease-in-out transform hover:scale-125 text-sm">
                  <FaLinkedinIn />
                </a>
                <a href="https://github.com/Derkysan" target="_blank" className="flex items-center justify-center hover:border-2 w-8 h-8 rounded-full text-gray-500 hover:border-[#6e5494] hover:text-[#6e5494] transition-all duration-300 ease-in-out transform hover:scale-125 text-sm">
                  <FiGithub />
                </a>
              </div>
            </div>         
        </div>
      </div>

    </div>
  );
}

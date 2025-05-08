'use client'

import React from "react";
import { useTheme } from "next-themes";

import { CustomContact, CustomContactDialog, CustomCopyTextBtn, CustomGradientText, CustomLogo, CustomSplitText } from "@/components/shared";

import { FiGithub } from "react-icons/fi";
import { CgDarkMode } from "react-icons/cg";
import { SiNestjs } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaAngular, FaWordpressSimple } from "react-icons/fa6";

export default function Page() {
  const [isContactOpen, setIsContactOpen] = React.useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setTheme('dark');
  }, []);

  const handleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      return
    }
    setTheme('light');
  }

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
    <div className="w-full h-screen flex flex-col ">

      {/* CONTACT DIALOG */}
      <CustomContactDialog isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} />

      <div className="">
        <div className="container mx-auto">    
          <div className="flex items-center justify-between h-28 px-5">
            <span>
              <CustomLogo />
            </span>
            <div className="flex gap-10">
              <div className="flex items-center gap-5 text-xs tracking-widest">
                <a href="https://www.linkedin.com/in/derkysan/" target="_blank" className="cursor-pointer text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110">LinkedIn</a>
                <span>/</span>
                <a href="https://github.com/Derkysan" target="_blank" className="cursor-pointer text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110">Github</a>
              </div>
              
              <div className="bg-dark z-10 right-5 top-5 flex gap-2">
                <button onClick={handleTheme} className={`flex items-center justify-center text-lg p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110`}>
                  <CgDarkMode />
                </button>
              </div>
            </div>
            
          </div>
        </div>
        {/* <div className="w-full h-[0.5px] border-none bg-gradient-to-r from-[#f8af00]/20 to-[#ee7d00]/40"></div> */}
      </div>      
      <div className="flex flex-grow">        
        <div className="flex flex-col container mx-auto">
          <div className="w-full flex flex-grow items-center gap-28 justify-center px-5 h-[calc(100vh-7rem)]">
            <div className="lg:w-[45%]">
              <h1 className="flex gap-2 text-3xl uppercase mb-5">
                Hola, Soy <CustomGradientText>Derky</CustomGradientText>
              </h1>
              <div className="lg:text-left text-lg font-light mb-10 leading-loose">
                <CustomSplitText text={"Desarrollador de software especializado en tecnologías frontend y backend. Con experiencia en React, TypeScript y frameworks modernos, desarrollo aplicaciones web escalables y de alto rendimiento, centradas en ofrecer experiencias de usuario fluidas y soluciones backend robustas."} />
              </div>

              <div className="flex flex-wrap gap-8 items-center mb-10">
                <span className={`text-sm uppercase tracking-wide`}>
                  <CustomGradientText>Tech Stack</CustomGradientText>
                </span>
                <ul className="flex gap-5 text-3xl border-l text-gray-600 xl:ps-6">
                  <li><FaHtml5 /></li>
                  <li><FaCss3Alt /></li>
                  <li><FaJs /></li>
                  <li><FaReact /></li>
                  <li><FaAngular /></li>
                  <li><FaWordpressSimple /></li>
                  <li><SiNestjs /></li>
                </ul>
              </div>
            {/* <div className="border">Contactar</div> */}
            </div>
          </div>
          {/* <div className="w-full h-[0.5px] border-none bg-gradient-to-r from-[#f8af00]/20 to-[#ee7d00]/40"></div> */}
        </div>
      </div>

      <div className="">
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

      <div className="border-gray-400 dark:border-gray-700 border-t">
          <div className="container mx-auto">   
            <div className="flex items-center justify-between h-28 px-5">
              <span className="text-xs text-gray-600 dark:text-gray-400 italic">© {new Date().getFullYear()} All rights reserved.</span>

              <div className="flex items-center gap-6 text-gray-600">
                <a href="https://www.linkedin.com/in/derkysan/" target="_blank" className="flex items-center justify-center hover:border-2 w-8 h-8 rounded-full text-gray-500 hover:border-[#0a66c2] hover:text-[#0a66c2] transition-all duration-300 ease-in-out transform hover:scale-125 text-sm"                  >
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

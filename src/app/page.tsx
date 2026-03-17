
import React from "react";
import {
  CustomContactDialog,
  CustomGradientText,
  CustomHeroTitle,
  CustomSplitText,
} from "@/components/shared";
import { usePersistTheme } from "@/hooks";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import sidebarConfig from "@/config/sidebar.config";

export default function Page() {
  const [isContactOpen, setIsContactOpen] = React.useState<boolean>(false);

  usePersistTheme();

  return (
    <div className="relative flex min-h-dvh w-full flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(249,176,0,0.08),transparent_42%),linear-gradient(-45deg,rgba(255,255,255,0.02),transparent_18%)]" />

      <CustomContactDialog isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} />

      <div className="relative z-10 flex flex-grow">
        <div className="container mx-auto flex flex-col">
          <div className="flex min-h-svh w-full flex-grow items-center justify-center px-5 py-8">
            <div className="max-w-4xl lg:w-[60%]">
              <CustomHeroTitle />
              <div className="text-sm font-light leading-loose lg:text-left">
                <CustomSplitText text={"Desarrollador de software enfocado en soluciones escalables y de alto rendimiento, centradas en experiencias de usuario fluidas y arquitecturas robustas."} />
              </div>

              {!sidebarConfig.enabled && (
                <div className="mb-10 flex items-center gap-4">
                  <a href={sidebarConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border-gray-300 text-sm text-gray-500 transition-all duration-300 ease-in-out hover:scale-110 hover:border-[#0a66c2] hover:text-[#0a66c2] dark:border-gray-600">
                    <FaLinkedinIn />
                  </a>
                  <a href={sidebarConfig.social.github} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border-gray-300 text-sm text-gray-500 transition-all duration-300 ease-in-out hover:scale-110 hover:border-[#6e5494] hover:text-[#6e5494] dark:border-gray-600">
                    <FiGithub />
                  </a>
                  <a href="mailto:derkysan19@gmail.com" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border-gray-300 text-sm text-gray-500 transition-all duration-300 ease-in-out hover:scale-110 hover:border-[#ea4335] hover:text-[#ea4335] dark:border-gray-600">
                    <HiOutlineMail />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden">
        <div className="container mx-auto">
          <div className="grid h-80 grid-cols-1 items-center justify-center gap-10 px-5 py-5 xl:grid-cols-2">
            <div className="text-center xl:text-end">
              <h3 className="text-4xl font-thin uppercase">
                Tienes algún <br />proyecto en mente, <br /><CustomGradientText>conversemos</CustomGradientText>!
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

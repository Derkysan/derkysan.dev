'use client'

import React from "react";
import { motion } from 'motion/react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaAngular, FaWordpressSimple } from "react-icons/fa6";
import { SiNestjs } from "react-icons/si";
import { CustomTechStackSkeleton } from "./CustomTechStackSkeleton";

export const CustomTechStack = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <CustomTechStackSkeleton />;

  return (
    <motion.ul
      className="flex gap-3 text-3xl text-gray-600 bg-background"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1, // efecto de entrada secuencial
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {[FaHtml5, FaCss3Alt, FaJs, FaReact, FaAngular, FaWordpressSimple, SiNestjs].map((Icon, index) => (
        <motion.li 
          key={index} 
          variants={{
            hidden: { opacity: 0, x: -20 },
            show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
          }}
        >
          <Icon />
        </motion.li>
      ))}
    </motion.ul>
  );
};

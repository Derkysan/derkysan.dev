'use client'

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface DotProps {
  x: number;
  y: number;
  mouseX: number;
  mouseY: number;
  colorInicial: string;
  colorHover: string;
  opacidadInicial: number;
  opacidadHover: number;
  tamano: number;
}

const Dot: React.FC<DotProps> = ({ x, y, mouseX, mouseY, colorInicial, colorHover, opacidadInicial, opacidadHover, tamano }) => {
  const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));
  const maxDistance = 150;
  const scale = distance < maxDistance ? 1 + (maxDistance - distance) / maxDistance : 1;
  const opacity = distance < maxDistance ? opacidadHover : opacidadInicial;
  const backgroundColor = distance < maxDistance ? colorHover : colorInicial;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: tamano,
        height: tamano,
      }}
      animate={{
        scale: scale,
        opacity: opacity,
        backgroundColor: backgroundColor,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        backgroundColor: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }}
    />
  );
};

interface InteractiveDotGridProps {
  colorInicial?: string;
  colorHover?: string;
  colorInicialLight?: string;
  colorInicialDark?: string;
  colorHoverLight?: string;
  colorHoverDark?: string;
  opacidadInicial?: number;
  opacidadHover?: number;
  tamano?: number;
}

export const InteractiveDotGrid: React.FC<InteractiveDotGridProps> = ({ 
  colorInicial = "#000000",
  colorHover = "#f97316",
  colorInicialLight,
  colorInicialDark,
  colorHoverLight,
  colorHoverDark,
  opacidadInicial = 0.4,
  opacidadHover = 0.5,
  tamano = 4
}) => {
  const [mousePosition, setMousePosition] = React.useState({ x: -1000, y: -1000 });
  const [dots, setDots] = React.useState<{ x: number; y: number }[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();

  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = activeTheme === "dark";

  // Determinar colores según el tema
  const currentColorInicial = isDark 
    ? (colorInicialDark || colorInicial)
    : (colorInicialLight || colorInicial);
  
  const currentColorHover = isDark 
    ? (colorHoverDark || colorHover)
    : (colorHoverLight || colorHover);

  React.useEffect(() => {
    const generateDots = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const spacing = 30;
      const newDots: { x: number; y: number }[] = [];

      for (let x = spacing; x < width; x += spacing) {
        for (let y = spacing; y < height; y += spacing) {
          newDots.push({ x, y });
        }
      }

      setDots(newDots);
      console.log(`Generated ${newDots.length} dots`);
    };

    generateDots();
    window.addEventListener("resize", generateDots);

    return () => window.removeEventListener("resize", generateDots);
  }, []);

  React.useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleGlobalMouseLeave = () => {
      setMousePosition({ x: -1000, y: -1000 });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseleave", handleGlobalMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseleave", handleGlobalMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10"
    >
      {dots.map((dot, index) => (
        <Dot
          key={index}
          x={dot.x}
          y={dot.y}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
          colorInicial={currentColorInicial}
          colorHover={currentColorHover}
          opacidadInicial={opacidadInicial}
          opacidadHover={opacidadHover}
          tamano={tamano}
        />
      ))}
    </div>
  );
};

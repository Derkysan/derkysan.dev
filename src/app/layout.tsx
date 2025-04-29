import type { Metadata } from "next";
import "./globals.css";

import { Nunito, Titillium_Web } from 'next/font/google'

import { Providers } from "@/providers";

import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from "@/components/shared";

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});
const titilum = Titillium_Web({
  weight: ["200", "300", "400", "600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Derkysan | Software Developer",
  description: "Desarrollador de software especializado en tecnologías frontend y backend. Con experiencia en React, TypeScript y frameworks modernos, desarrollo aplicaciones web escalables y de alto rendimiento, centradas en ofrecer experiencias de usuario fluidas y soluciones backend robustas.",
  openGraph: {
    title: "Derkysan | Software Developer",
    description: "Desarrollador de software especializado en tecnologías frontend y backend. Con experiencia en React, TypeScript y frameworks modernos, desarrollo aplicaciones web escalables y de alto rendimiento, centradas en ofrecer experiencias de usuario fluidas y soluciones backend robustas.",
    url: "https://www.derkysan.dev",
    siteName: "derkysan.dev",
    images: [
      {
        url: "https://www.derkysan.dev/opengraph-image.png", // Ruta absoluta de la imagen
        width: 1200,
        height: 630,
        alt: "Logo San",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Derkysan | Software Developer",
    description: "Desarrollador de software especializado en tecnologías frontend y backend. Con experiencia en React, TypeScript y frameworks modernos, desarrollo aplicaciones web escalables y de alto rendimiento, centradas en ofrecer experiencias de usuario fluidas y soluciones backend robustas.",
    images: ["https://www.derkysan.dev/opengraph-image.png"], // Misma imagen para Twitter
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.className} ${titilum.className} antialiased`}>
        <Providers>
          {children}
          <SpeedInsights />
        </Providers>
        
        <GoogleAnalytics />
      </body>
    </html>
  );
}

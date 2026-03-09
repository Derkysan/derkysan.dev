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
  title: "Derkysan | Páginas web para Pymes",
  description: "Desarrollo páginas web orientadas a captar clientes para emprendedores y Pymes que necesitan una presencia profesional en internet.",
  openGraph: {
    title: "Derkysan | Páginas web para Pymes",
    description: "Desarrollo páginas web orientadas a captar clientes para emprendedores y Pymes que necesitan una presencia profesional en internet.",
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
    title: "Derkysan | Páginas web para Pymes",
    description: "Desarrollo páginas web orientadas a captar clientes para emprendedores y Pymes que necesitan una presencia profesional en internet.",
    images: ["https://www.derkysan.dev/opengraph-image.png"], // Misma imagen para Twitter
  },
};

const themeInitializer = `(() => {
  try {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  } catch (error) {}
})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${nunito.className} ${titilum.className} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitializer,
          }}
        />
        <Providers initialTheme="dark">
          {children}
          <SpeedInsights />
        </Providers>

        <GoogleAnalytics />
      </body>
    </html>
  );
}

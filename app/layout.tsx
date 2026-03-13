import type { Metadata } from "next";
import {
  Geist,
  PT_Sans,
  Roboto,
  Arimo,
  Roboto_Slab,
  DM_Mono,
  Work_Sans,
  Geist_Mono,
  Inter,
} from "next/font/google";

import localFont from "next/font/local";

import "./globals.css";
import Header from "./custom-components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const lucideSans = localFont({
  src: "../public/fonts/lucida-sans-unicode.woff2",
  variable: "--font-lucide",
  weight: "400",
  display: "swap",
});

export const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-roboto-slab", // optional for CSS variable usage
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const arimo = Arimo({
  subsets: ["latin"],
  variable: "--font-arimo",
  weight: ["400", "500", "600", "700"], // choose what you need
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"], // specify required weights
  style: ["normal", "italic"], // optional
  variable: "--font-pt-sans",
  display: "swap",
});

// 👇 Configure Inter
export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MScada | Home ",
  description: "An app used for detecting fault using AI ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-google-analytics-opt-out="">
      <body
        // 👇 Add inter.variable to your class string
        className={`${geistSans.variable} ${robotoSlab.variable} ${ptSans.variable} ${arimo.variable} ${dmMono.variable}  ${roboto.variable} ${workSans.variable} ${geistMono.variable} ${lucideSans.variable} ${inter.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}

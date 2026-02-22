import type { Metadata } from "next";
import {
  Geist,
  Roboto,
  Arimo,
  DM_Mono,
  Work_Sans,
  Geist_Mono,
  Inter,
} from "next/font/google";
import "./globals.css";
import Header from "./custom-components/Header";
import Footer from "./custom-components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
// 👇 Configure Inter
export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FDS AI | Home ",
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
        className={`${geistSans.variable} ${arimo.variable} ${dmMono.variable}  ${roboto.variable} ${workSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

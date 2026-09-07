// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "José Gambín | Full Stack Developer",
    template: "%s | José Gambín",
  },
  description: "Desarrollador Full Stack especializado en Java, Spring Boot y aplicaciones web modernas.",
  keywords: ["Full Stack Developer", "Java", "Spring Boot", "React", "Next.js", "TypeScript"],
  authors: [{ name: "José Gambín" }],
  creator: "José Gambín",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://tu-dominio.com",
    title: "José Gambín | Full Stack Developer",
    description: "Desarrollador Full Stack especializado en Java, Spring Boot y aplicaciones web modernas.",
    siteName: "José Gambín Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "José Gambín | Full Stack Developer",
    description: "Desarrollador Full Stack especializado en Java, Spring Boot y aplicaciones web modernas.",
    creator: "@tu-usuario",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-black text-white antialiased">
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
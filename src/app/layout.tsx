import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { portfolio } from "@/data/portfolio";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://josegambin.dev'),
  title: {
    default: `${portfolio.shortName} · ${portfolio.role}`,
    template: `%s · ${portfolio.shortName}`
  },
  description: portfolio.description,
  keywords: ["Full Stack Developer", "Java 21", "Spring Boot", "Microservicios", "React", "TypeScript", "PostgreSQL", "Oracle SQL", "DevOps", "CI/CD", "Desarrollador Web", "Portfolio"],
  authors: [{ name: portfolio.name }],
  creator: portfolio.name,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: portfolio.shortName,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://josegambin.dev",
    title: `${portfolio.shortName} · ${portfolio.role}`,
    description: portfolio.description,
    siteName: `Portfolio ${portfolio.shortName}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolio.shortName} · ${portfolio.role}`,
    description: portfolio.description,
    creator: "@josegambin"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
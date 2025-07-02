/** @format */

import type { Metadata } from "next";
import "@/styles/globals.css";
import { Sofia_Sans } from "next/font/google";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { CustomQueryClientProvider } from "@/providers/query-client-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "The Notiv",
    template: "%s | Notiv ",
  },
  description: "Descrição padrão do Notiv",
};

const sofiaSans = Sofia_Sans({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-sofia",
  display: "swap", // Usando o display swap para garantir renderização mais rápida
  fallback: ["sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased dark ${sofiaSans.className}`}>
        <Header />
        <Toaster position="bottom-center" />
        <CustomQueryClientProvider>{children}</CustomQueryClientProvider>
        <Footer />
      </body>
    </html>
  );
}

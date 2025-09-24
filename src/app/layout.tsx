/** @format */

import type { Metadata } from "next";
import "@/styles/globals.css";
import { Sofia_Sans } from "next/font/google";
import { CustomQueryClientProvider } from "@/providers/query-client-provider";
import { Toaster } from "sonner";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";

export const metadata: Metadata = {
  title: {
    default: "Notiv",
    template: "%s | Notiv ",
  },
  description: "Um blog daora",
};

const sofiaSans = Sofia_Sans({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-sofia",
  display: "swap", // Usando o display swap para garantir renderização mais rápida
  fallback: ["sans-serif"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased dark ${sofiaSans.className}`}>
        <CustomQueryClientProvider>
          <Header />
          <Toaster position="bottom-center" />
          {children}
          <Footer />
        </CustomQueryClientProvider>
      </body>
    </html>
  );
}

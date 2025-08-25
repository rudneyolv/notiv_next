/** @format */

import type { Metadata } from "next";
import "@/styles/globals.css";
import { Sofia_Sans } from "next/font/google";
import { CustomQueryClientProvider } from "@/providers/query-client-provider";
import { Toaster } from "sonner";
import { Header } from "@/components/header/header";
import { cookies } from "next/headers";
import { Footer } from "@/components/footer/footer";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const isLogged = !!cookiesStore.get("access_token");

  return (
    <html lang="en">
      <body className={`antialiased dark ${sofiaSans.className}`}>
        <Header isLogged={isLogged} />
        <Toaster position="bottom-center" />
        <CustomQueryClientProvider>{children}</CustomQueryClientProvider>
        <Footer />
      </body>
    </html>
  );
}

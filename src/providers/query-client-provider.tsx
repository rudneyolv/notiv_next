/** @format */
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface QueryClientProviderProps {
  children: React.ReactNode;
}

export function CustomQueryClientProvider({ children }: QueryClientProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

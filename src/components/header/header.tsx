/** @format */
"use client";

import { HeaderUI } from "./header-ui";
import { useApiQueries } from "@/hooks/queries";
import { Skeleton } from "../ui/skeleton";

export function Header() {
  let logged: boolean = false;
  const { data, isLoading } = useApiQueries.auth.validateSession();

  if (isLoading) return <Skeleton className="w-full h-[72px] p-4 bg-background" />;

  if (data) {
    logged = data.logged;
  }

  return <HeaderUI isLogged={logged} />;
}

/** @format */
"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getHeaderRoutes } from "./header-routes";
import Link from "next/link";

export const Header = ({ isLogged }: { isLogged: boolean }) => {
  const pathname = usePathname();
  const routes = getHeaderRoutes(isLogged);

  return (
    <div className="flex flex-row items-center justify-around bg-zinc-950 p-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                "sm:text-3xl font-bold select-none transition-colors",
                "!bg-transparent",
                "hover:!text-purple-500 focus:!text-purple-500"
              )}
              asChild
            >
              <Link href="/">Notiv</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          {routes.map(({ href, label, Icon }) => {
            const isActive = pathname === href;
            return (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    "flex flex-row items-center gap-2 font-semibold select-none transition-colors",
                    isActive ? "!text-purple-500" : "!text-zinc-200",
                    "hover:text-purple-400 focus:text-purple-400"
                  )}
                >
                  <Link href={href}>
                    <Icon className="h-5 w-5 text-inherit" />
                    {label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

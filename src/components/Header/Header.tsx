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
import { Home, SquareChartGantt } from "lucide-react";

export const Header = () => {
  const pathname = usePathname();

  const navOptions = [
    {
      href: "/",
      icon: Home,
      label: "Home",
    },
    {
      href: "/admin/posts",
      icon: SquareChartGantt,
      label: "Admin",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-around bg-zinc-950 p-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/"
              className={cn(
                "sm:text-3xl font-bold select-none transition-colors",
                "!bg-transparent",
                "hover:!text-purple-500 focus:!text-purple-500"
              )}
            >
              Notiv
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          {navOptions.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink
                  href={href}
                  className={cn(
                    "flex flex-row items-center gap-2 font-semibold select-none transition-colors",
                    isActive ? "!text-purple-500" : "!text-zinc-200",
                    "hover:text-purple-400 focus:text-purple-400"
                  )}
                >
                  <Icon className="h-5 w-5 text-inherit" />
                  {label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

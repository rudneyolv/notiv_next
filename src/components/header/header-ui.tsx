/** @format */
"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getHeaderRoutes } from "./header-routes";
import Link from "next/link";
import { LinkStyles } from "./header-styles";

export function HeaderUI({ isLogged }: { isLogged: boolean }) {
  const pathname = usePathname();
  const routes = getHeaderRoutes(isLogged);

  return (
    <div className="flex flex-row items-center justify-around bg-background p-4 h-[72px]">
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
          {routes.map((route) => {
            const { href, label, Icon, type } = route;

            if (type === "direct") {
              const isActive = pathname === href;

              return (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild className={LinkStyles({ active: isActive })}>
                    <Link href={href}>
                      <Icon className="h-5 w-5 text-inherit" />
                      {label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            }

            if (type === "list") {
              return (
                <NavigationMenuItem key={href}>
                  <NavigationMenuTrigger className={LinkStyles()}>
                    <Icon className="h-5 w-5 text-inherit" />
                    {label}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="grid w-[200px]">
                      {route.children.map(({ href, label, Icon }) => {
                        const isActive = pathname.startsWith(href);

                        return (
                          <li key={href}>
                            <NavigationMenuLink
                              asChild
                              className={LinkStyles({ active: isActive })}
                            >
                              <Link href={href} className="flex-row items-center gap-2">
                                <Icon className="h-5 w-5 text-inherit" />
                                {label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

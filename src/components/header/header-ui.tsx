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
import { hooks } from "@/hooks";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function HeaderUI({ isLogged }: { isLogged: boolean }) {
  const pathname = usePathname();
  const routes = getHeaderRoutes(isLogged);
  const isLargeScreen = hooks.ui.mediaQuery("sm");

  const [isSheetOpen, setSheetOpen] = useState<boolean>(false);

  const handleLinkClick = () => {
    setSheetOpen(false); // fecha o sheet quando clicar em um link
  };

  return (
    <div className="flex flex-row items-center justify-between lg:justify-around bg-background p-4 h-[72px]">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                "text-2xl sm:text-3xl font-bold select-none transition-colors",
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

      {isLargeScreen && (
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
      )}

      {/* Menu mobile */}
      {!isLargeScreen && (
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="p-2">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-64 p-4">
            <SheetTitle>
              <VisuallyHidden>Menu de navegação</VisuallyHidden>
            </SheetTitle>

            <nav className="flex flex-col gap-4">
              {routes.map((route) => {
                const { href, label, Icon, type } = route;

                if (type === "direct") {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={handleLinkClick} // fecha sheet
                      className={cn(LinkStyles({ active: isActive }), "flex items-center gap-2")}
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </Link>
                  );
                }

                if (type === "list") {
                  return (
                    <div key={href} className="flex flex-col gap-2">
                      <span className="flex items-center gap-2 font-semibold">
                        <Icon className="h-5 w-5" />
                        {label}
                      </span>
                      <div className="flex flex-col pl-6 gap-2">
                        {route.children.map(({ href, label, Icon }) => {
                          const isActive = pathname.startsWith(href);

                          return (
                            <Link
                              key={href}
                              href={href}
                              onClick={handleLinkClick} // fecha sheet
                              className={cn(
                                LinkStyles({ active: isActive }),
                                "flex items-center gap-2"
                              )}
                            >
                              <Icon className="h-5 w-5" />
                              {label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              })}
            </nav>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}

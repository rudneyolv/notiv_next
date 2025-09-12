/** @format */
"use client";

import { LinkStyles } from "@/components/header/header-styles";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EditProfileRoutes } from "./routes";

export function EditProfileHeader() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {EditProfileRoutes.map(({ href, label, Icon }) => {
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
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

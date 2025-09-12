/** @format */

import { LinkStyles } from "@/components/header/header-styles";
import { Heading } from "@/components/heading/heading";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { CircleUserRound, Lock, Mail } from "lucide-react";
import Link from "next/link";

//TODO: Tambem criar um layout para my-profile
export default function EditProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <div className="p-2 flex flex-col items-center gap-8">
        <Heading>Meu perfil</Heading>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/my-profile/edit" className={LinkStyles()}>
                  <CircleUserRound className="h-5 w-5 text-inherit" />
                  Editar perfil
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/my-profile/edit/password" className={LinkStyles()}>
                  <Lock className="size-5 text-inherit" />
                  Alterar senha
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/my-profile/edit/email" className={LinkStyles()}>
                  <Mail className="size-5 text-inherit" />
                  Alterar Email
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {children}
      </div>
    </div>
  );
}

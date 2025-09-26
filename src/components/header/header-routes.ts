/** @format */

// header-routes.ts
import { Route } from "@/types/routes-types";
import { CircleUserRound, Home, LogIn, LogOut, Pen, StickyNote, UserPlus } from "lucide-react";

export const defaultRoutes: Route[] = [
  {
    href: "/",
    Icon: Home,
    label: "Home",
    type: "direct",
  },
];

export const publicRoutes: Route[] = [
  {
    href: "/login",
    Icon: LogIn,
    label: "Entrar",
    type: "direct",
  },
  {
    href: "/register",
    Icon: UserPlus,
    label: "Criar conta",
    type: "direct",
  },
];

export const privateRoutes: Route[] = [
  {
    href: "/my-profile",
    Icon: CircleUserRound,
    label: "Meu perfil",
    type: "list",
    children: [
      {
        href: "/my-profile/posts",
        Icon: StickyNote,
        label: "Meus posts",
      },
      {
        href: "/my-profile/edit",
        Icon: Pen,
        label: "Editar perfil",
      },

      {
        href: "/logout",
        Icon: LogOut,
        label: "Sair",
      },
    ],
  },
];

export function getHeaderRoutes(isLogged: boolean): Route[] {
  return [...defaultRoutes, ...(isLogged ? privateRoutes : publicRoutes)];
}

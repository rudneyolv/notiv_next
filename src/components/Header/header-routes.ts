/** @format */

// header-routes.ts
import { CircleUserRound, Home, LogIn, LucideIcon, Pen, StickyNote, UserPlus } from "lucide-react";

export type DirectRoute = {
  href: string;
  Icon: LucideIcon;
  label: string;
  type: "direct";
};

export type ListRoute = {
  href: string;
  Icon: LucideIcon;
  label: string;
  type: "list";
  children: ListChildRoute[];
};

export type ListChildRoute = {
  href: string;
  Icon: LucideIcon;
  label: string;
};

export type Route = DirectRoute | ListRoute;

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
    ],
  },
];

export function getHeaderRoutes(isLogged: boolean): Route[] {
  return [...defaultRoutes, ...(isLogged ? privateRoutes : publicRoutes)];
}

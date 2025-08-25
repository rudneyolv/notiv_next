/** @format */
import { CircleUserRound, Home, LogIn, UserPlus } from "lucide-react";

const defaultRoutes = [
  {
    href: "/",
    Icon: Home,
    label: "Home",
  },
];

const publicRoutes = [
  {
    href: "/login",
    Icon: LogIn,
    label: "Entrar",
  },
  {
    href: "/register",
    Icon: UserPlus,
    label: "Criar conta",
  },
];

const privateRoutes = [
  {
    href: "/my-profile/posts",
    Icon: CircleUserRound,
    label: "Meu perfil",
  },
];

export function getHeaderRoutes(isLogged: boolean) {
  return [...defaultRoutes, ...(isLogged ? privateRoutes : publicRoutes)];
}

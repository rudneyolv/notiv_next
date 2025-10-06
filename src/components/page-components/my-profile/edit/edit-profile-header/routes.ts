/** @format */

import { Route } from "@/types/routes-types";
import { CircleUserRound, Lock, Mail } from "lucide-react";

export const EditProfileRoutes: Route[] = [
  {
    href: "/my-profile/edit",
    Icon: CircleUserRound,
    label: "Perfil",
    type: "direct",
  },
  {
    href: "/my-profile/edit/password",
    Icon: Lock,
    label: "Senha",
    type: "direct",
  },
  {
    href: "/my-profile/edit/email",
    Icon: Mail,
    label: "Email",
    type: "direct",
  },
];

/** @format */

import { Route } from "@/types/routes-types";
import { CircleUserRound, Lock, Mail } from "lucide-react";

export const EditProfileRoutes: Route[] = [
  {
    href: "/my-profile/edit",
    Icon: CircleUserRound,
    label: "Editar perfil",
    type: "direct",
  },
  {
    href: "/my-profile/edit/password",
    Icon: Lock,
    label: "Alterar senha",
    type: "direct",
  },
  {
    href: "/my-profile/edit/email",
    Icon: Mail,
    label: "Alterar Email",
    type: "direct",
  },
];

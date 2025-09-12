/** @format */

import { LucideIcon } from "lucide-react";

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

/** @format */

import LogoutDialog from "@/components/page-components/logout/logout-dialog/logout-dialog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logout",
  description: "Encerre sua sessão na Notiv com segurança.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/logout`,
  },
};

export default function LogoutPage() {
  return <LogoutDialog />;
}

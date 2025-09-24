/** @format */

import { Heading } from "@/components/heading/heading";
import { EditProfileHeader } from "@/components/page-components/my-profile/edit/edit-profile-header/edit-profile-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meu perfil",
  description: "Gerencie suas informações pessoais na Notiv.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/my-profile/edit`,
  },
};

export default function EditProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <div className="p-2 flex flex-col items-center gap-8">
        <Heading>Meu perfil</Heading>

        <EditProfileHeader />

        {children}
      </div>
    </div>
  );
}

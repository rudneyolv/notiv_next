/** @format */

import { Heading } from "@/components/heading/heading";
import { EditProfileHeader } from "@/components/page-components/my-profile/edit/edit-profile-header/edit-profile-header";

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

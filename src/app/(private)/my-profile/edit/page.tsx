/** @format */

import { ChangePasswordForm } from "@/components/forms/change-password-form/change-password-form";
import { Heading } from "@/components/heading/heading";

export default function EditProfile() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <Heading>Meu perfil</Heading>

      <div className="min-h-screen  w-full max-w-3xl p-12 flex flex-col items-center gap-2">
        <ChangePasswordForm />
      </div>
    </div>
  );
}

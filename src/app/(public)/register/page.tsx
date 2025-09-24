/** @format */

import { RegisterForm } from "@/components/forms/register-form/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrar",
  description: "Crie sua conta na Notiv.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register`,
  },
};

export default function RegisterPage() {
  return (
    <div className="bg-zinc-950 min-h-screen flex flex-col items-center justify-center p-8">
      <RegisterForm />
    </div>
  );
}

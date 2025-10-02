/** @format */

import { LoginForm } from "@/components/forms/login-form/login-form";
import { Metadata } from "next";
import { env } from "node:process";

export const metadata: Metadata = {
  title: "Login",
  description: "Acesse sua conta na Notiv.",
  alternates: {
    canonical: `${env.NEXT_PUBLIC_FRONTEND_URL}/login`,
  },
};

export default function LoginPage() {
  return (
    <div className="bg-zinc-950 min-h-screen flex flex-col items-center justify-center p-8">
      <LoginForm />
    </div>
  );
}

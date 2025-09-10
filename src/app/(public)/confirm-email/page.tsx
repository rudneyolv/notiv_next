/** @format */

import { Heading } from "@/components/heading/heading";
import { Text } from "@/components/text/text";

export default function LoginPage() {
  return (
    <div className="bg-zinc-950 min-h-screen flex flex-col items-center justify-center p-8 gap-2">
      <Heading className="sm:text-4xl">Registro efetuado com sucesso!</Heading>

      <Text className="text-zinc-300 sm:text-lg">
        Enviamos um e-mail para você com instruções de confirmação. Por favor, verifique sua caixa
        de entrada antes de tentar fazer login.
      </Text>
    </div>
  );
}

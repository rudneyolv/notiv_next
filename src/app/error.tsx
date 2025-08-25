/** @format */
"use client";

import { Text } from "@/components/text/text";
import { isError } from "@/utils/errors";

interface RootErrorProps {
  error: unknown;
}

export default function RootError({ error }: RootErrorProps) {
  console.log("🔴 - Erro capturado na Root Error:", error);

  return (
    <div className="w-dvw h-dvh bg-zinc-900 flex flex-col items-center justify-center">
      <Text className="font-bold text-xl sm:text-3xl">Ocorreu um erro na aplicação</Text>
      <Text className="text-gray-400">{isError(error) ? error.message : "Erro desconhecido"}</Text>
    </div>
  );
}

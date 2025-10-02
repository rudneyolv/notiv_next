/** @format */

// /app/actions/revalidateActions.ts
"use server";

import { utils } from "@/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";

export async function revalidateTagAction(formData: FormData) {
  const encryptedPayload = formData.get("payload") as string;

  // 1. VALIDAÇÃO DO PAYLOAD
  if (!encryptedPayload) return;

  const revalidateData = await utils.tagsEncryption.decrypt(encryptedPayload);

  if (!revalidateData) {
    console.warn(`Payload de revalidação inválido recebido.`);
    return;
  }

  const { tag, path: expectedPath } = revalidateData;

  // 2. VERIFICAÇÃO DE CONTEXTO (Payload está sendo usado no lugar certo)
  const headersList = await headers();
  const referer = headersList.get("referer");

  const actualPath = referer ? new URL(referer).pathname : null;

  if (expectedPath !== actualPath) {
    console.warn(
      `Tentativa de revalidação cross-page detectada! Payload para o path '${expectedPath}' foi usado no path '${actualPath}'.`
    );
    return;
  }

  revalidateTag(tag);
  revalidatePath(expectedPath);
}

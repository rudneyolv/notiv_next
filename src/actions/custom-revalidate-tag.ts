/** @format */

// /app/actions/revalidateActions.ts
"use server";

import { utils } from "@/utils";
import { revalidateTag } from "next/cache";

export async function revalidateTagAction(formData: FormData) {
  const encryptedTag = formData.get("tag") as string;
  const decryptedTag = await utils.tagsEncryption.decrypt(encryptedTag);

  if (!decryptedTag) {
    console.warn(`🔴 - Tag inválida recebida. Revalidação sem sucesso`);
    return;
  }

  revalidateTag(encryptedTag);
}

/** @format */
"use server";

import { revalidateTagAction } from "@/actions/custom-revalidate-tag";
import { RetryButton } from "./_components/retry-button";
import { utils } from "@/utils";
import { RevalidateData } from "@/utils/tags-encryption/tags-encryption";

export async function RetryForm({ revalidateData }: { revalidateData: RevalidateData }) {
  const encryptedPayload = await utils.tagsEncryption.encrypt(revalidateData);

  return (
    <form action={revalidateTagAction}>
      <input type="hidden" name="payload" value={encryptedPayload} />
      <RetryButton />
    </form>
  );
}

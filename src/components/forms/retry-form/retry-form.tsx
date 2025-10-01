/** @format */

import { revalidateTagAction } from "@/actions/custom-revalidate-tag";
import { RetryButton } from "./_components/retry-button";
import { utils } from "@/utils";

interface RetryFormProps {
  revalidationTag: string;
}

export async function RetryForm({ revalidationTag }: RetryFormProps) {
  const encryptedTag = await utils.tagsEncryption.encrypt(revalidationTag);

  return (
    <form action={revalidateTagAction}>
      <input type="hidden" name="tag" value={encryptedTag} />
      <RetryButton />
    </form>
  );
}

/** @format */

"use server";

import { revalidateTag } from "next/cache";

//TODO: Refatorar revalidate de tag em client-side
export const revalidateCustomTag = async (tag: string) => {
  revalidateTag(tag);
};

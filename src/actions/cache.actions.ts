/** @format */

"use server";

import { revalidateTag } from "next/cache";

export const revalidateCustomTag = async (tag: string) => {
  revalidateTag(tag);
};

/** @format */
"use client";

import { Text } from "@/components/text/text";
import { PostsTable } from "../../../posts-table/posts-table";
import { useApiQueries } from "@/hooks/queries";
import { isApiError } from "@/utils/errors/is-api-error";
import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { Loader2 } from "lucide-react";
import { utils } from "@/utils";

export const MyPosts = () => {
  const { data, error, isLoading } = useApiQueries.posts.fetchAllMe();

  if (isLoading) return <Loader2 className="animate-spin" />;

  if (error) {
    const parsedError = utils.errors.parseApiError(error);
    return <ApiErrorMessages messages={parsedError.messages} />;
  }

  if (!data || data?.length <= 0) {
    return <Text>Nenhum post foi encontrado...</Text>;
  }

  return <PostsTable posts={data} />;
};

/** @format */
"use client";

import { Text } from "@/components/text/text";
import { PostsTable } from "../../../posts-table/posts-table";
import { useApiQueries } from "@/hooks/queries";
import { isApiError } from "@/utils/is-api-error";
import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { Loader2 } from "lucide-react";

export const MyPosts = () => {
  const { data, error, isLoading } = useApiQueries.posts.fetchAllMe();

  if (isLoading) return <Loader2 className="animate-spin" />;

  if (error) {
    const errorMessages = isApiError(error) ? error.messages : ["Erro ao buscar seus posts"];
    return <ApiErrorMessages messages={errorMessages} />;
  }

  if (!data || data?.length <= 0) {
    return <Text>Nenhum post foi encontrado...</Text>;
  }

  return <PostsTable posts={data} />;
};

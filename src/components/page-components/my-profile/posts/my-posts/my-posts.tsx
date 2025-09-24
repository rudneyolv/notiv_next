/** @format */
"use client";

import { Text } from "@/components/text/text";
import { useApiQueries } from "@/hooks/queries";
import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { Loader2 } from "lucide-react";
import { PostsTable } from "@/components/posts-table/posts-table";

export const MyPosts = () => {
  const { data, error, isLoading } = useApiQueries.posts.fetchAllMe();

  if (isLoading) return <Loader2 className="animate-spin" />;

  if (error) {
    return <ApiErrorMessages messages={error.messages} />;
  }

  if (!data || data?.length <= 0) {
    return <Text>Nenhum post foi encontrado...</Text>;
  }

  return <PostsTable posts={data} />;
};

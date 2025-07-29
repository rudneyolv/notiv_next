/** @format */

import { Text } from "@/components/Text/Text";
import { PostDataProps } from "@/interfaces/posts/post-interface";
import { isError } from "@/utils/errors";
import { AdminPostsTable } from "../AdminPostsTable/AdminPostsTable";
import { adminPostsApi } from "@/api/admin/posts-api";

//TODO: Transformar em página client, usar tanstack query e buscar os dados sem cache do next
export const AdminPostsList = async () => {
  let posts: PostDataProps[] = [];

  try {
    posts = await adminPostsApi.fetchAll();
  } catch (error) {
    const errorMessage = isError(error) ? error.message : "Erro ao buscar posts";
    return <Text>{errorMessage}</Text>;
  }

  if (posts.length === 0) {
    return <Text>Nenhum post foi encontrado...</Text>;
  }

  return <AdminPostsTable posts={posts} />;
};

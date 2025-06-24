/** @format */

import { Text } from "@/components/Text/Text";
import { PostDataProps } from "@/interfaces/posts/post-interface";
import { PostsRepository } from "@/repository/posts.repository";
import { isError } from "@/utils/errors";
import { AdminPostsTable } from "../AdminPostsTable/AdminPostsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const postsRepositoryInstance = new PostsRepository();

export const AdminPostsList = async () => {
  let posts: PostDataProps[] = [];

  try {
    posts = await postsRepositoryInstance.fetchAdminPosts();
  } catch (error) {
    const errorMessage = isError(error) ? error.message : "Erro ao buscar posts";
    return <Text>{errorMessage}</Text>;
  }

  if (posts.length === 0) {
    return <Text>Nenhum post foi encontrado...</Text>;
  }

  return <AdminPostsTable posts={posts} />;
};

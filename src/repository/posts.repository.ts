/** @format */

import { PostDataProps } from "@/interfaces/posts/post-interface";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export class PostsRepository {
  public fetchPosts = async (): Promise<PostDataProps[]> => {
    try {
      const response = await fetch(`${apiUrl}/posts`, {
        next: {
          revalidate: 30,
          tags: ["posts"],
        },
      });
      const posts = await response.json();
      return posts;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        throw error;
      }

      throw new Error("Erro desconhecido ao buscar os posts");
    }
  };
}

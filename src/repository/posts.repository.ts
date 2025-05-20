/** @format */

import { PostDataProps } from "@/interfaces/posts/post-interface";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class PostsRepository {
  public fetchPosts = async (): Promise<PostDataProps[]> => {
    try {
      const response = await fetch(`${apiUrl}/posts`, {
        method: "GET",
        next: {
          revalidate: 60,
          tags: ["posts"],
        },
      });
      const posts = await response.json();

      await delay(2000);

      return posts;
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Erro desconhecido ao buscar os posts");
    }
  };

  public fetchBySlug = async (slug: string): Promise<PostDataProps> => {
    try {
      const response = await fetch(`${apiUrl}/posts?slug=${slug}`, {
        method: "GET",
        cache: "force-cache",
        next: {
          revalidate: 60,
          tags: ["post", slug],
        },
      });

      await delay(2000);

      const [post] = await response.json();
      return post;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Erro desconhecido ao buscar o post");
    }
  };
}

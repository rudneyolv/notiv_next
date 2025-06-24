/** @format */

import { PostDataProps } from "@/interfaces/posts/post-interface";
import { cache } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const delay = () => new Promise((resolve) => setTimeout(resolve, 500));

export class PostsRepository {
  public fetchPosts = async (): Promise<PostDataProps[]> => {
    try {
      const response = await fetch(`${apiUrl}/posts`, {
        method: "GET",
        next: {
          revalidate: 100,
          tags: ["new-post"],
        },
      });
      const posts = await response.json();

      await delay();

      return posts;
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Erro desconhecido ao buscar os posts");
    }
  };

  public fetchAdminPosts = async (): Promise<PostDataProps[]> => {
    try {
      const response = await fetch(`${apiUrl}/posts`, {
        method: "GET",
        next: {
          revalidate: 100,
          tags: ["new-post"],
        },
      });
      const posts = await response.json();

      await delay();

      return posts;
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Erro desconhecido ao buscar os posts");
    }
  };

  public fetchBySlug = cache(async (slug: string): Promise<PostDataProps> => {
    try {
      const response = await fetch(`${apiUrl}/posts?slug=${slug}`, {
        method: "GET",
        cache: "force-cache",
        next: {
          revalidate: 60,
          tags: ["post", slug],
        },
      });

      await delay();

      const [post] = await response.json();
      return post;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Erro desconhecido ao buscar o post");
    }
  });
}

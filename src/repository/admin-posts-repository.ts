/** @format */

// Utilizar em createnewpost quando estiver com um backend real
// const formData = new FormData();

// formData.append("title", title);
// formData.append("summary", summary);
// formData.append("author_name", author_name);
// formData.append("author_last_name", author_last_name);
// formData.append("content", content);

// if (image) {
//   formData.append("image", image);
// }

// const response = await fetch("", {
//   method: "POST",
//   body: formData,
// });

import { PostDataProps } from "@/interfaces/posts/post-interface";
import { FormPostData } from "@/schemas/admin/posts/new-post-schema";
import { cache } from "react";
import slugify from "slugify";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const delay = () => new Promise((resolve) => setTimeout(resolve, 300));

export class AdminPostsRepository {
  public fetchAdminPosts = async (): Promise<PostDataProps[]> => {
    try {
      const response = await fetch(`${apiUrl}/posts`, {
        method: "GET",
        next: {
          revalidate: 100,
          tags: ["new-post", "edit-post", "delete-post"],
        },
      });
      const posts = await response.json();

      await delay();

      return posts;
    } catch (error: unknown) {
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
        cache: "no-store",
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

  public createNewPost = cache(async (data: FormPostData) => {
    const response = await fetch(`${apiUrl}/posts`, {
      method: "POST",
      body: JSON.stringify({
        slug: slugify(data.title, {
          lower: true,
          strict: true,
          trim: true,
        }),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...data,
        image: "/images/bryen_0.png", //TODO: leia o topo do arquivo
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //TODO: adaptar conforme backend
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw new Error(error.message || "Erro desconhecido");
    }

    const responseData = await response.json();

    return responseData;
  });

  public editPost = async (data: PostDataProps) => {
    const { id: postId } = data;
    await delay();
    const response = await fetch(`${apiUrl}/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ ...data, updated_at: new Date().toISOString() }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Erro desconhecido");
    }

    return responseData;
  };

  public deletePost = async (postid: string | number) => {
    const response = await fetch(`${apiUrl}/posts/${postid}`, {
      method: "DELETE",
    });

    await delay();
    throw new Error("Erro vindo da requisição");

    // const responseData = await response.json();

    // if (!response.ok) {
    //   throw new Error(responseData.message || "Erro desconhecido");
    // }

    // return responseData;
  };
}

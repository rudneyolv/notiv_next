/** @format */

import { PostDataProps } from "@/interfaces/posts/post-interface";
import { env } from "@/constants/env";
import { FormPostData } from "@/schemas/admin/posts/new-post-schema";
import slugify from "slugify";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const delay = () => new Promise((resolve) => setTimeout(resolve, 500));

const cachedFetchAll = async (): Promise<PostDataProps[]> => {
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
    console.error(error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Erro desconhecido ao buscar os posts");
  }
};

const cachedFetchBySlug = async (slug: string): Promise<PostDataProps> => {
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
};

const fetchAll = async (): Promise<PostDataProps[]> => {
  try {
    const response = await fetch(`${env.API_URL}/posts`, {
      method: "GET",
      cache: "force-cache",
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

const fetchBySlug = async (slug: string): Promise<PostDataProps> => {
  try {
    const response = await fetch(`${env.API_URL}/posts?slug=${slug}`, {
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
};

const createNewPost = async (data: FormPostData) => {
  const response = await fetch(`${env.API_URL}/posts`, {
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
};

const editPost = async (data: PostDataProps) => {
  const { id: postId } = data;
  await delay();
  const response = await fetch(`${env.API_URL}/posts/${postId}`, {
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

const deletePost = async (postid: string | number) => {
  const response = await fetch(`${env.API_URL}/posts/${postid}`, {
    method: "DELETE",
  });

  await delay();

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Erro desconhecido");
  }

  return responseData;
};

export const postsApi = {
  cachedFetchAll,
  cachedFetchBySlug,
  fetchAll: fetchAll,
  fetchBySlug: fetchBySlug,
  create: createNewPost,
  edit: editPost,
  delete: deletePost,
};

/** @format */

import { CreatePostDto, Post, UpdatePostDto } from "@/types/posts-types";
import { env } from "@/constants/env";
import { isApiError } from "@/utils/is-api-error";
import { createFallbackApiError } from "@/utils/create-api-error";
import { postsApiCacheOptions } from "./posts-cache";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { ApiError } from "@/types/api-types";
import { api } from "..";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const delay = () => new Promise((resolve) => setTimeout(resolve, 0));

const fetchAllBase = async (initConfig?: RequestInit): Promise<Post[]> => {
  try {
    await delay();

    const response = await fetch(`${apiUrl}/posts`, {
      method: "GET",
      ...initConfig,
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result as Post[];
  } catch (error: unknown) {
    if (isApiError(error)) {
      throw error;
    } else {
      throw createFallbackApiError("Erro desconhecido ao buscar posts");
    }
  }
};

const fetchAllMeBase = async (initConfig?: RequestInit): Promise<Post[]> => {
  try {
    await delay();

    const response = await fetch(`${apiUrl}/posts/me`, {
      method: "GET",
      credentials: "include",
      ...initConfig,
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result as Post[];
  } catch (error: unknown) {
    if (isApiError(error)) {
      throw error;
    } else {
      throw createFallbackApiError("Erro desconhecido ao buscar seus posts");
    }
  }
};

const cachedFetchBySlug = async (slug: string): Promise<Post> => {
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

const fetchAllSla = async (): Promise<Post[]> => {
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

const fetchBySlugBase = async ({
  initConfig,
  slug,
}: {
  initConfig?: RequestInit;
  slug: string;
}): Promise<Post> => {
  try {
    await delay();

    const response = await fetch(`${env.API_URL}/posts/slug/${slug}`, {
      method: "GET",
      ...initConfig,
    });

    const result = await response.json();

    if (!response.ok) throw result;

    return result as Post;
  } catch (error: unknown) {
    if (isApiError(error)) {
      throw error as ApiError;
    } else {
      throw createFallbackApiError("Erro desconhecido ao buscar Post");
    }
  }
};

const createNewPost = async (data: CreatePostDto) => {
  try {
    let imageUrl: string | undefined;

    if (data.image instanceof File) {
      const formData = new FormData();
      formData.append("file", data.image);
      imageUrl = await api.uploads.uploadFile(formData);
    }

    const response = await fetch(`${env.API_URL}/posts`, {
      method: "POST",
      body: JSON.stringify({ ...data, imageUrl: imageUrl ?? null }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    await delay();

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result as Post;
  } catch (error: unknown) {
    if (isApiError(error)) {
      throw error;
    } else {
      throw createFallbackApiError("Erro desconhecido ao criar post");
    }
  }
};

const editPost = async (data: UpdatePostDto) => {
  try {
    const { id: postId, image, ...payloadData } = data;
    let imageUrl: string | undefined = data.imageUrl ?? undefined;

    if (image instanceof File) {
      const formData = new FormData();
      formData.append("file", image);
      imageUrl = await api.uploads.uploadFile(formData);
    }

    const response = await fetch(`${env.API_URL}/posts/${postId}`, {
      method: "PATCH",
      body: JSON.stringify({ ...payloadData, imageUrl }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    await delay();

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result as Post;
  } catch (error: unknown) {
    if (isApiError(error)) {
      throw error;
    } else {
      throw createFallbackApiError("Erro desconhecido ao criar post");
    }
  }
};

const deletePost = async (postid: string | number) => {
  try {
    const response = await fetch(`${env.API_URL}/posts/soft-delete/${postid}`, {
      method: "PATCH",
      credentials: "include",
    });

    await delay();

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result as Post;
  } catch (error: unknown) {
    if (isApiError(error)) {
      throw error;
    } else {
      throw createFallbackApiError("Erro desconhecido ao excluir post");
    }
  }
};

export const postsApi = {
  cached: {
    fetchAll: async () => await fetchAllBase(postsApiCacheOptions.fetchAll()),

    fetchBySlug: async (slug: string): Promise<Post> => {
      const data = { slug, initConfig: postsApiCacheOptions.fetchBySlug(slug) };
      return await fetchBySlugBase(data);
    },
  },

  nonCached: {
    fetchAll: async (): Promise<Post[]> => await fetchAllBase(),
    fetchAllMe: async (): Promise<Post[]> => await fetchAllMeBase(),
    fetchBySlug: async (slug: string): Promise<Post> => await fetchBySlugBase({ slug }),
  },

  create: createNewPost,
  edit: editPost,
  delete: deletePost,
};

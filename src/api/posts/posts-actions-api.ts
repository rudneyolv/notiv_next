/** @format */
"use server";

import { CreatePostDto, Post, UpdatePostDto } from "@/types/posts-types";
import { env } from "@/constants/env";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { postsApiCacheTags } from "./posts-cache";
import { utils } from "@/utils";
import { uploadsApi } from "../uploads";

const delay = () => new Promise((resolve) => setTimeout(resolve, 0));

//------------------ GET ------------------
export const fetchAllBase = async (initConfig?: RequestInit): Promise<Post[]> => {
  try {
    const cookiesStore = await cookies();
    await delay();

    const response = await fetch(`${env.API_URL}/posts`, {
      method: "GET",
      headers: {
        Cookie: cookiesStore.toString(),
      },
      ...initConfig,
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result as Post[];
  } catch (error: unknown) {
    throw utils.errors.throwApiError({
      error,
      fallbackMessage: "Erro desconhecido ao buscar posts",
    });
  }
};

export const fetchAllMeBase = async (initConfig?: RequestInit): Promise<Post[]> => {
  try {
    await delay();
    const cookiesStore = await cookies();

    const response = await fetch(`${env.API_URL}/posts/me`, {
      method: "GET",
      headers: {
        Cookie: cookiesStore.toString(),
      },
      ...initConfig,
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result as Post[];
  } catch (error: unknown) {
    throw utils.errors.throwApiError({
      error,
      fallbackMessage: "Erro desconhecido ao buscar seus posts",
    });
  }
};

export const fetchBySlugBase = async (data: {
  initConfig?: RequestInit;
  slug: string;
}): Promise<Post> => {
  try {
    const { initConfig, slug } = data;

    await delay();

    const response = await fetch(`${env.API_URL}/posts/slug/${slug}`, {
      method: "GET",
      ...initConfig,
    });

    const result = await response.json();

    if (!response.ok) throw result;

    return result as Post;
  } catch (error: unknown) {
    throw utils.errors.throwApiError({
      error,
      fallbackMessage: "Erro desconhecido ao buscar post",
    });
  }
};

//------------------ POST ------------------
export const createNewPost = async (data: CreatePostDto): Promise<Post> => {
  try {
    const cookiesStore = await cookies();

    let imageUrl: string | undefined;

    if (data.image instanceof File) {
      const formData = new FormData();
      formData.append("file", data.image);
      imageUrl = await uploadsApi.uploadFile(formData);
    }

    const response = await fetch(`${env.API_URL}/posts`, {
      method: "POST",
      body: JSON.stringify({ ...data, imageUrl: imageUrl ?? null }),
      headers: {
        "Content-Type": "application/json",
        Cookie: cookiesStore.toString(),
      },
    });

    await delay();

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    revalidateTag(postsApiCacheTags.createPost());

    return result as Post;
  } catch (error: unknown) {
    throw utils.errors.throwApiError({
      error,
      fallbackMessage: "Erro desconhecido ao criar post",
    });
  }
};

//------------------ PATCH ------------------
export const editPost = async (data: UpdatePostDto): Promise<Post> => {
  try {
    const cookiesStore = await cookies();
    const { id: postId, image, ...payloadData } = data;
    let imageUrl: string | undefined = data.imageUrl ?? undefined;

    if (image instanceof File) {
      const formData = new FormData();
      formData.append("file", image);
      imageUrl = await uploadsApi.uploadFile(formData);
    }

    const response = await fetch(`${env.API_URL}/posts/${postId}`, {
      method: "PATCH",
      body: JSON.stringify({ ...payloadData, imageUrl }),
      headers: {
        Cookie: cookiesStore.toString(),
        "Content-Type": "application/json",
      },
    });

    await delay();

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    const post: Post = result;

    revalidateTag(`post-${post.slug}`);
    revalidateTag("edit-post");

    return post;
  } catch (error: unknown) {
    throw utils.errors.throwApiError({
      error,
      fallbackMessage: "Erro desconhecido ao editar post",
    });
  }
};

export const deletePost = async (postid: string | number): Promise<Post> => {
  try {
    const cookiesStore = await cookies();

    const response = await fetch(`${env.API_URL}/posts/soft-delete/${postid}`, {
      method: "PATCH",
      headers: {
        Cookie: cookiesStore.toString(),
      },
    });

    await delay();

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    const post: Post = result;

    revalidateTag("delete-post");
    revalidateTag(`post-${post.slug}`);

    return post;
  } catch (error: unknown) {
    throw utils.errors.throwApiError({
      error,
      fallbackMessage: "Erro desconhecido ao excluir post",
    });
  }
};

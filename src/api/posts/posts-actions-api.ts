/** @format */
"use server";

import { CreatePostDto, Post, UpdatePostDto } from "@/types/posts-types";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { revalidateTag } from "next/cache";
import { postsApiCacheTags } from "./posts-cache";
import { uploadsApi } from "../uploads";
import { apiRequest } from "@/lib/api/api-request";

const delay = () => new Promise((resolve) => setTimeout(resolve, 0));

//------------------ GET ------------------
export const fetchAllBase = async (initConfig?: RequestInit): Promise<Post[]> => {
  const result: Post[] = await apiRequest({
    requireAuth: false,
    endpoint: "/posts",
    fallbackMessage: "Erro desconhecido ao buscar os posts",
    requestConfig: {
      method: "GET",
      ...initConfig,
    },
  });

  return result;
};

export const fetchAllMeBase = async (initConfig?: RequestInit): Promise<Post[]> => {
  const result: Post[] = await apiRequest({
    requireAuth: true,
    endpoint: "/posts/me",
    fallbackMessage: "Erro desconhecido ao buscar seus posts",
    requestConfig: {
      method: "GET",
      ...initConfig,
    },
  });

  return result;
};

export const fetchBySlugBase = async (data: {
  initConfig?: RequestInit;
  slug: string;
}): Promise<Post> => {
  const { initConfig, slug } = data;

  const result: Post = await apiRequest({
    requireAuth: false,
    endpoint: `/posts/slug/${slug}`,
    fallbackMessage: "Erro desconhecido ao buscar post",
    requestConfig: {
      method: "GET",
      ...initConfig,
    },
  });

  return result;
};

//------------------ POST ------------------
export const createNewPost = async (data: CreatePostDto): Promise<Post> => {
  await delay();

  let imageUrl: string | undefined;

  if (data.image instanceof File) {
    const formData = new FormData();
    formData.append("file", data.image);
    imageUrl = await uploadsApi.uploadFile(formData);
  }

  const result: Post = await apiRequest({
    endpoint: `/posts`,
    fallbackMessage: "Erro desconhecido ao criar post",
    requestConfig: {
      body: JSON.stringify({ ...data, imageUrl: imageUrl ?? null }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  revalidateTag(postsApiCacheTags.createPost());

  return result;
};

//------------------ PATCH ------------------
export const editPost = async (data: UpdatePostDto): Promise<Post> => {
  const { id: postId, image, ...payloadData } = data;
  let imageUrl: string | undefined = data.imageUrl ?? undefined;

  await delay();

  if (image instanceof File) {
    const formData = new FormData();
    formData.append("file", image);
    imageUrl = await uploadsApi.uploadFile(formData);
  }

  const result: Post = await apiRequest({
    endpoint: `/posts/${postId}`,
    fallbackMessage: "Erro desconhecido ao editar post",
    requestConfig: {
      body: JSON.stringify({ ...payloadData, imageUrl }),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  revalidateTag(`post-${result.slug}`);
  revalidateTag("edit-post");

  return result;
};

export const deletePost = async (postid: string | number): Promise<Post> => {
  await delay();

  const result: Post = await apiRequest({
    endpoint: `/posts/soft-delete/${postid}`,
    fallbackMessage: "Erro desconhecido ao editar post",
    requestConfig: {
      method: "PATCH",
    },
  });

  revalidateTag("delete-post");
  revalidateTag(`post-${result.slug}`);

  return result;
};

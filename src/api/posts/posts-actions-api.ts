/** @format */
"use server";

import { CreatePostDto, Post, UpdatePostDto } from "@/types/posts-types";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { revalidateTag } from "next/cache";
import { postsApiCacheTags } from "./posts-cache";
import { uploadsApi } from "../uploads";
import { apiRequest } from "@/lib/api/api-request";
import { ApiError } from "@/schemas/api/api-error-schema";
import { utils } from "@/utils";
import { UploadResponse } from "@/types/upload.types";

const delay = () => new Promise((resolve) => setTimeout(resolve, 0));

//------------------ GET ------------------
export const fetchAllBase = async (initConfig?: RequestInit): Promise<Post[] | ApiError> => {
  return apiRequest({
    requireAuth: false,
    endpoint: "/posts",
    fallbackMessage: "Erro desconhecido ao buscar os posts",
    requestConfig: {
      method: "GET",
      ...initConfig,
    },
  });
};

export const fetchAllMeBase = async (initConfig?: RequestInit): Promise<Post[] | ApiError> => {
  return apiRequest({
    requireAuth: true,
    endpoint: "/posts/me",
    fallbackMessage: "Erro desconhecido ao buscar seus posts",
    requestConfig: {
      method: "GET",
      ...initConfig,
    },
  });
};

export const fetchBySlugBase = async (data: {
  initConfig?: RequestInit;
  slug: string;
}): Promise<Post | ApiError> => {
  const { initConfig, slug } = data;

  return apiRequest({
    requireAuth: false,
    endpoint: `/posts/slug/${slug}`,
    fallbackMessage: "Erro desconhecido ao buscar post",
    requestConfig: {
      method: "GET",
      ...initConfig,
    },
  });
};

//------------------ POST ------------------
export const createNewPost = async (data: CreatePostDto): Promise<Post | ApiError> => {
  await delay();

  let imageUrl: string | undefined;

  if (data.image instanceof File) {
    const formData = new FormData();
    formData.append("file", data.image);
    const uploadResult: UploadResponse | ApiError = await uploadsApi.uploadFile(formData);

    if (utils.errors.isApiError(uploadResult)) {
      return uploadResult;
    }

    imageUrl = uploadResult.url;
  }

  const result: Post | ApiError = await apiRequest({
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

  if (utils.errors.isApiError(result)) {
    return result;
  }

  revalidateTag(postsApiCacheTags.createPost());
  return result;
};

//------------------ PATCH ------------------
export const updatePost = async (data: UpdatePostDto): Promise<Post | ApiError> => {
  const { id: postId, image, ...payloadData } = data;
  let imageUrl: string | undefined = data.imageUrl ?? undefined;

  await delay();

  if (image instanceof File) {
    const formData = new FormData();
    formData.append("file", image);
    const uploadResult: UploadResponse | ApiError = await uploadsApi.uploadFile(formData);

    if (utils.errors.isApiError(uploadResult)) {
      return uploadResult;
    }

    imageUrl = uploadResult.url;
  }

  const result: Post | ApiError = await apiRequest({
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

  if (utils.errors.isApiError(result)) {
    return result;
  }

  revalidateTag(postsApiCacheTags.slug(result.slug));
  revalidateTag(postsApiCacheTags.updatePost());
  return result;
};

export const deletePost = async (postid: string): Promise<Post | ApiError> => {
  await delay();

  const result: Post | ApiError = await apiRequest({
    endpoint: `/posts/soft-delete/${postid}`,
    fallbackMessage: "Erro desconhecido ao editar post",
    requestConfig: {
      method: "PATCH",
    },
  });

  if (utils.errors.isApiError(result)) {
    return result;
  }

  revalidateTag(postsApiCacheTags.deletePost());
  revalidateTag(postsApiCacheTags.slug(result.slug));

  return result;
};

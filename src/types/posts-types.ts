/** @format */

import { PostFormData } from "@/schemas/posts/post-form-schema";
import { User } from "@/types/users-types";

export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: User;
}

export type CreatePostDto = PostFormData;

export interface UpdatePostDto extends PostFormData {
  id: string;
  imageUrl?: string | null;
}

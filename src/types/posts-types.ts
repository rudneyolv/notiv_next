/** @format */

import { FormPostData } from "@/schemas/admin/posts/new-post-schema";
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

export type CreatePostDto = FormPostData;

export interface UpdatePostDto extends FormPostData {
  id: string;
  imageUrl?: string | null;
}

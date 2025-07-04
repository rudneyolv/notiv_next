/** @format */

import { PostRootStylesProps } from "@/components/Post/PostRoot/PostRoot-Styles";

export interface PostDataProps {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: File | string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  author_name: string;
  author_last_name: string;
}

export interface PostImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export interface PostHeadingProps {
  children: React.ReactNode;
}

export interface PostContentProps {
  children: React.ReactNode;
}

export interface PostTextProps {
  children: React.ReactNode;
}

export interface PostTimeProps {
  children: React.ReactNode;
  title: string;
  datetime: string;
}
export interface PostRootProps extends PostRootStylesProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

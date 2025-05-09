export interface PostModelprops {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: string;
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

export interface PostRootProps {
  children: React.ReactNode;
  href?: string;
}

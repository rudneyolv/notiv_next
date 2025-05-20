/** @format */

import CustomLink from "@/components/CustomLink/CustomLink";
import { Post } from "@/components/Post";
import { Text } from "@/components/Text/Text";
import { PostDataProps } from "@/interfaces/posts/post-interface";
import { PostsRepository } from "@/repository/posts.repository";
import { isError } from "@/utils/errors";
import { formatDatetime, formatRelativeDateToNow } from "@/utils/format-datetime";

const postsRepositoryInstance = new PostsRepository();

interface PostDetailsProps {
  slug: string;
}

export default async function PostDetails({ slug }: PostDetailsProps) {
  let post: PostDataProps;

  try {
    post = await postsRepositoryInstance.fetchBySlug(slug);
  } catch (error: unknown) {
    const errorMessage = isError(error) ? error.message : "Erro desconhecido ao buscar o post";
    return <Text>{errorMessage}</Text>;
  }

  return (
    <Post.Root variant="col" key={post.id}>
      <Post.Image src={post.coverImageUrl} alt={post.title} />
      <Post.Content>
        <Post.Time datetime={post.createdAt} title={formatDatetime(post.createdAt)}>
          {formatRelativeDateToNow(post.createdAt)}
        </Post.Time>
        <Post.Heading>{post.title}</Post.Heading>
        <Post.Text>{post.excerpt}</Post.Text>
      </Post.Content>
    </Post.Root>
  );
}

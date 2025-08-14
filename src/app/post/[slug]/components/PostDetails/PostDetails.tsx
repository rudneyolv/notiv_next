/** @format */

import { postsApi } from "@/api/posts-api";
import { Markdown } from "@/components/Markdown/Markdown";
import { Post } from "@/components/Post";
import { Text } from "@/components/Text/Text";
import { PostDataProps } from "@/interfaces/posts/post-interface";
import { isError } from "@/utils/errors";
import { formatDatetime, formatRelativeDateToNow } from "@/utils/format-datetime";

interface PostDetailsProps {
  slug: string;
}

export default async function PostDetails({ slug }: PostDetailsProps) {
  let post: PostDataProps;

  try {
    post = await postsApi.cachedFetchBySlug(slug);
  } catch (error: unknown) {
    const errorMessage = isError(error) ? error.message : "Erro desconhecido ao buscar o post";
    return <Text>{errorMessage}</Text>;
  }

  if (!post) {
    return <Text>Post não encontrado...</Text>;
  }

  return (
    <Post.Root variant="col" key={post.id}>
      {typeof post.image === "string" && <Post.Image src={post.image} alt={post.title} />}
      <Post.Content>
        <div>
          <Post.Text>{`${post.author_name} ${post.author_last_name}`}</Post.Text>
          <Post.Time datetime={post.created_at} title={formatDatetime(post.created_at)}>
            {formatRelativeDateToNow(post.created_at)}
          </Post.Time>
        </div>

        <Post.Heading>{post.title}</Post.Heading>
        <Markdown markdown={post.content} />
      </Post.Content>
    </Post.Root>
  );
}

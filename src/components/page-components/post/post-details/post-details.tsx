/** @format */

import { api } from "@/api";
import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { Markdown } from "@/components/markdown/markdown";
import { PostCard } from "@/components/blocks/post-card";
import { Text } from "@/components/text/text";
import { Post as PostType } from "@/types/posts-types";
import { formatDatetime, formatRelativeDateToNow } from "@/utils/format-datetime";
import { isApiError } from "@/utils/is-api-error";

interface PostDetailsProps {
  slug: string;
}

export default async function PostDetails({ slug }: PostDetailsProps) {
  let post: PostType;

  try {
    post = await api.posts.cached.fetchBySlug(slug);
  } catch (error: unknown) {
    const errorMessages = isApiError(error) ? error.messages : ["Erro ao buscar posts"];
    return <ApiErrorMessages messages={errorMessages} />;
  }

  if (!post) {
    return <Text>Post não encontrado...</Text>;
  }

  return (
    <PostCard.Root variant="col" key={post.id}>
      {typeof post.imageUrl === "string" && <PostCard.Image src={post.imageUrl} alt={post.title} />}
      <PostCard.Content>
        <div>
          <PostCard.Text>{post.author.name}</PostCard.Text>
          <PostCard.Time datetime={post.createdAt} title={formatDatetime(post.createdAt)}>
            {formatRelativeDateToNow(post.createdAt)}
          </PostCard.Time>
        </div>

        <PostCard.Heading>{post.title}</PostCard.Heading>
        <Markdown markdown={post.content} />
      </PostCard.Content>
    </PostCard.Root>
  );
}

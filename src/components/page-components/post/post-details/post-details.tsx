/** @format */

import { api } from "@/api";
import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { Markdown } from "@/components/markdown/markdown";
import { PostCard } from "@/components/blocks/post-card";
import { Text } from "@/components/text/text";
import { formatDatetime, formatRelativeDateToNow } from "@/utils/format-datetime";
import { utils } from "@/utils";
import { images } from "@/constants/images-constants";

interface PostDetailsProps {
  slug: string;
}

export async function PostDetails({ slug }: PostDetailsProps) {
  const result = await api.posts.cached.fetchBySlug(slug);

  if (utils.errors.isApiError(result)) return <ApiErrorMessages messages={result.messages} />;

  if (!result) {
    return <Text>Post não encontrado...</Text>;
  }

  const post = result;

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <PostCard.Image src={post.imageUrl || images.fallbacks.post.banner} alt={post.title} />{" "}
      <PostCard.Content>
        <div>
          <PostCard.Text className="sm:text-xl">{post.author.name}</PostCard.Text>
          <PostCard.Time datetime={post.createdAt} title={formatDatetime(post.createdAt)}>
            {formatRelativeDateToNow(post.createdAt)}
          </PostCard.Time>
        </div>

        <PostCard.Heading className="sm:text-5xl font-bold">{post.title}</PostCard.Heading>
        <Markdown markdown={post.content} />
      </PostCard.Content>
    </div>
  );
}

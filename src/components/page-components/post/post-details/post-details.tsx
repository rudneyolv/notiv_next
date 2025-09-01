/** @format */

import { api } from "@/api";
import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { Markdown } from "@/components/markdown/markdown";
import { PostCard } from "@/components/blocks/post-card";
import { Text } from "@/components/text/text";
import { Post as PostType } from "@/types/posts-types";
import { formatDatetime, formatRelativeDateToNow } from "@/utils/format-datetime";
import { utils } from "@/utils";
import { CircleDivide } from "lucide-react";
import { images } from "@/constants/images-constants";

interface PostDetailsProps {
  slug: string;
}

export default async function PostDetails({ slug }: PostDetailsProps) {
  let post: PostType;

  try {
    post = await api.posts.cached.fetchBySlug(slug);
  } catch (error: unknown) {
    const parsedError = utils.errors.parseApiError(error);
    return <ApiErrorMessages messages={parsedError.messages} />;
  }

  if (!post) {
    return <Text>Post não encontrado...</Text>;
  }

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

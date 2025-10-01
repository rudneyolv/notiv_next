/** @format */

import { api } from "@/api";
import { postsApiCacheTags } from "@/api/posts/posts-cache";
import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { PostCard } from "@/components/blocks/post-card";
import { RetryForm } from "@/components/forms/retry-form/retry-form";
import { Text } from "@/components/text/text";
import { images } from "@/constants/images-constants";
import { utils } from "@/utils";
import { formatDatetime, formatRelativeDateToNow } from "@/utils/format-datetime";

export const PostsList = async () => {
  const result = await api.posts.cached.fetchAll();

  if (utils.errors.isApiError(result)) {
    return (
      <div className="flex flex-col gap-0">
        <ApiErrorMessages messages={result.messages} />
        <RetryForm revalidationTag={postsApiCacheTags.posts()} />
      </div>
    );
  }

  if (result.length === 0) {
    return <Text>Nenhum post foi encontrado...</Text>;
  }

  const posts = result;

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="grid md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <PostCard.Root variant="col" key={post.id} href={`/post/${post.slug}`} className="">
            <PostCard.Image
              priority={true}
              src={post.imageUrl || images.fallbacks.post.banner}
              alt={post.title}
            />
            <PostCard.Content>
              <div>
                <PostCard.Text className="sm:text-xl">{post.author.name}</PostCard.Text>

                <PostCard.Time datetime={post.createdAt} title={formatDatetime(post.createdAt)}>
                  {formatRelativeDateToNow(post.createdAt)}
                </PostCard.Time>
              </div>
              <PostCard.Heading>{post.title}</PostCard.Heading>
              <PostCard.Text>{post.summary}</PostCard.Text>
            </PostCard.Content>
          </PostCard.Root>
        ))}
      </div>
    </div>
  );
};

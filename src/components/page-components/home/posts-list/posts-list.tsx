/** @format */

import { api } from "@/api";
import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { PostCard } from "@/components/blocks/post-card";
import { Text } from "@/components/text/text";
import { images } from "@/constants/images-constants";
import { Post as PostType } from "@/types/posts-types";
import { formatDatetime, formatRelativeDateToNow } from "@/utils/format-datetime";
import { isApiError } from "@/utils/is-api-error";

export const PostsList = async () => {
  let posts: PostType[] = [];

  try {
    posts = await api.posts.cached.fetchAll();
  } catch (error) {
    const errorMessages = isApiError(error) ? error.messages : ["Erro ao buscar posts"];
    return <ApiErrorMessages messages={errorMessages} />;
  }

  if (posts.length === 0) {
    return <Text>Nenhum post foi encontrado...</Text>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {posts.map((post) => (
        <PostCard.Root variant="col" key={post.id} href={`/post/${post.slug}`} className="">
          <PostCard.Image src={post.imageUrl || images.fallbacks.post.banner} alt={post.title} />{" "}
          <PostCard.Content>
            <PostCard.Time datetime={post.createdAt} title={formatDatetime(post.createdAt)}>
              {formatRelativeDateToNow(post.createdAt)}
            </PostCard.Time>
            <PostCard.Heading>{post.title}</PostCard.Heading>
            <PostCard.Text>{post.summary}</PostCard.Text>
          </PostCard.Content>
        </PostCard.Root>
      ))}
    </div>
  );
};

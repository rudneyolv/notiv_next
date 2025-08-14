/** @format */

import { postsApi } from "@/api/posts-api";
import { Post } from "@/components/Post";
import { Text } from "@/components/Text/Text";
import { PostDataProps } from "@/interfaces/posts/post-interface";
import { isError } from "@/utils/errors";
import { formatDatetime, formatRelativeDateToNow } from "@/utils/format-datetime";

export const PostsList = async () => {
  let posts: PostDataProps[] = [];

  try {
    posts = await postsApi.cachedFetchAll();
  } catch (error) {
    const errorMessage = isError(error) ? error.message : "Erro ao buscar posts";
    return <Text>{errorMessage}</Text>;
  }

  if (posts.length === 0) {
    return <Text>Nenhum post foi encontrado...</Text>;
  }

  return (
    <div className="grid md:grid-cols-2">
      {posts.map((post) => (
        <Post.Root variant="col" key={post.id} href={`/post/${post.slug}`}>
          {typeof post.image === "string" && <Post.Image src={post.image} alt={post.title} />}
          <Post.Content>
            <Post.Time datetime={post.created_at} title={formatDatetime(post.created_at)}>
              {formatRelativeDateToNow(post.created_at)}
            </Post.Time>
            <Post.Heading>{post.title}</Post.Heading>
            <Post.Text>{post.summary}</Post.Text>
          </Post.Content>
        </Post.Root>
      ))}
    </div>
  );
};

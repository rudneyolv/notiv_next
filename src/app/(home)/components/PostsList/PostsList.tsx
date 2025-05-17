/** @format */

import { Post } from "@/components/Post";
import { Text } from "@/components/Text/Text";
import { PostDataProps } from "@/interfaces/posts/post-interface";
import { PostsRepository } from "@/repository/posts.repository";
import { isError } from "@/utils/errors";
import { formatDatetime, formatRelativeDateToNow } from "@/utils/format-datetime";

const postsRepositoryInstance = new PostsRepository();

export const PostsList = async () => {
  let posts: PostDataProps[] = [];

  try {
    posts = await postsRepositoryInstance.fetchPosts();
  } catch (error) {
    console.log(error);
    const errorMessage = isError(error) ? error.message : "Erro ao buscar posts";
    return <Text>{errorMessage}</Text>;
  }

  return (
    <div className="grid grid-cols-2">
      {posts.map((post) => (
        <Post.Root variant="col" key={post.id} href={`/post/${post.slug}`}>
          <Post.Image src={post.coverImageUrl} alt={post.title} />
          <Post.Content>
            <Post.Time datetime={post.createdAt} title={formatDatetime(post.createdAt)}>
              {formatRelativeDateToNow(post.createdAt)}
            </Post.Time>
            <Post.Heading>{post.title}</Post.Heading>
            <Post.Text>{post.excerpt}</Post.Text>
          </Post.Content>
        </Post.Root>
      ))}

      {posts.length === 0 && <Text>Nenhum post foi encontrado </Text>}
    </div>
  );
};

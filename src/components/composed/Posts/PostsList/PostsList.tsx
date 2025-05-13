import { Post } from "@/components/Post";
import { posts } from "@/constants/posts.mock";
import {
  formatDatetime,
  formatRelativeDateToNow,
} from "@/utils/format-datetime";

export const PostsList = () => {
  return (
    <div className="grid grid-cols-2">
      {posts.map((post) => (
        <Post.Root variant="col" key={post.id} href={`/post/${post.slug}`}>
          <Post.Image src={post.coverImageUrl} alt={post.title} />
          <Post.Content>
            <Post.Time
              datetime={post.createdAt}
              title={formatDatetime(post.createdAt)}
            >
              {formatRelativeDateToNow(post.createdAt)}
            </Post.Time>
            <Post.Heading>{post.title}</Post.Heading>
            <Post.Text>{post.content}</Post.Text>
          </Post.Content>
        </Post.Root>
      ))}
    </div>
  );
};

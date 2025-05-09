import { PostTextProps } from "@/interfaces/posts/post-interface";
import { Text } from "@/components/Text/Text";

export const PostText = ({ children }: PostTextProps) => {
  return <Text className="text-zinc-300">{children}</Text>;
};

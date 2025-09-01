/** @format */

import { Text } from "@/components/text/text";
import { cn } from "@/lib/utils";

export const PostText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <Text className={cn("text-zinc-300", className)}>{children}</Text>;
};

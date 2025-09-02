/** @format */

import { PostRoot } from "../post-root/post-root";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export function PostSkeleton() {
  return (
    <PostRoot className="space-y-3">
      <AspectRatio ratio={3 / 2}>
        <Skeleton className="h-full w-full rounded-none rounded-t-xl" />
      </AspectRatio>
      {/* Autor + tempo */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" /> {/* nome do autor */}
        <Skeleton className="h-3 w-16" /> {/* tempo */}
      </div>
      {/* Título */}
      <Skeleton className="h-7 w-3/4" />
      {/* Descrição */}
      <Skeleton className="h-4 w-5/6" />
    </PostRoot>
  );
}

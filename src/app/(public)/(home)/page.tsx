/** @format */

import { PostsList } from "@/components/page-components/home/posts-list/posts-list";
import { PostCard } from "@/components/blocks/post-card";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="bg-background min-h-screen mt-8 flex flex-col items-center justify-center">
      <div className="w-full min-h-screen max-w-[1000px] flex flex-col gap-4 p-4">
        <Suspense
          fallback={
            <div className="w-full grid md:grid-cols-2 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PostCard.Skeleton key={i} />
              ))}
            </div>
          }
        >
          <PostsList />
        </Suspense>
      </div>
    </div>
  );
}

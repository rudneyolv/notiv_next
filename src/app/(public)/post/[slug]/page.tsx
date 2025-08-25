/** @format */

import CustomLink from "@/components/CustomLink/CustomLink";
import { Suspense } from "react";
import { Text } from "@/components/text/text";
import PostDetails from "@/components/page-components/post/post-details/post-details";
import Link from "next/link";

interface PostPageParams {
  params: Promise<{ slug: string }>;
}

// export async function generateMetadata({ params }: PostPageParams): Promise<Metadata> {
//   const { slug } = await params;
//   const post = await postsRepositoryInstance.fetchBySlug(slug);

//   return {
//     title: post.title,
//     description: post.excerpt,
//   };
// }

export default async function PostPage({ params }: PostPageParams) {
  const { slug } = await params;

  return (
    <div className="w-full min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className=" w-full max-w-4xl flex flex-col items-center gap-2 p-4">
        <Suspense fallback={<Text className="font-bold animate-pulse uppercase">Loading</Text>}>
          <PostDetails slug={slug} />
          <Link
            href="/"
            className="text-zinc-400 text-center font-bold text-xl hover:text-zinc-200"
          >
            Ver todos posts
          </Link>
        </Suspense>
      </div>
    </div>
  );
}

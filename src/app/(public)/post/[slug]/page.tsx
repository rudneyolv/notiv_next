/** @format */

import { Suspense } from "react";
import { Text } from "@/components/text/text";
import Link from "next/link";
import { ArrowUpCircle, Loader2 } from "lucide-react";
import { PostDetails } from "@/components/page-components/post/post-details/post-details";

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
      <div className=" w-full max-w-5xl flex flex-col items-center gap-2 p-8">
        <Suspense fallback={<Loader2 className="animate-spin size-10" />}>
          <PostDetails slug={slug} />

          <Link
            href="#"
            className="mt-8 text-zinc-400 text-center font-bold text-md flex flex-row gap-2 justify-center items-center hover:text-zinc-200 transition-colors"
          >
            Voltar ao topo <ArrowUpCircle className="size-5" />
          </Link>
        </Suspense>
      </div>
    </div>
  );
}

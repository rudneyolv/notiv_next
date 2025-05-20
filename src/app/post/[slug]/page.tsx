/** @format */

import CustomLink from "@/components/CustomLink/CustomLink";
import PostDetails from "./components/PostDetails/PostDetails";
import { Suspense } from "react";
import { Text } from "@/components/Text/Text";

interface PostPageParams {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageParams) {
  const { slug } = await params;

  return (
    <div className="w-full h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-1/2 flex flex-col items-center gap-2">
        <Suspense fallback={<Text className="font-bold animate-pulse uppercase">Loading</Text>}>
          <PostDetails slug={slug} />
          <CustomLink
            href="/"
            className="text-zinc-400 text-center font-bold text-xl hover:text-zinc-200"
          >
            Voltar
          </CustomLink>
        </Suspense>
      </div>
    </div>
  );
}

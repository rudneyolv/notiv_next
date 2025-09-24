/** @format */

import { Text } from "@/components/text/text";
import { Suspense } from "react";
import { Heading } from "@/components/heading/heading";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MyPosts } from "@/components/page-components/my-profile/posts/my-posts/my-posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meus posts",
  description: "Gerencie seus posts na Notiv.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/my-profile/posts`,
  },
};

export default function AdminPosts() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <Heading>Notiv Admin</Heading>

      <div className="w-full max-w-3xl p-12 flex flex-col items-center gap-2">
        <div className="flex flex-row justify-between items-center w-full">
          <Text className="font-semibold">Posts</Text>
          <Link href="posts/new">
            <Button>
              <Plus />
              Novo post
            </Button>
          </Link>
        </div>

        <Suspense fallback={<Text className="font-bold animate-pulse uppercase">Loading</Text>}>
          <MyPosts />
        </Suspense>
      </div>
    </div>
  );
}

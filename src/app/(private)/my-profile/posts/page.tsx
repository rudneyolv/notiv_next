/** @format */

import { Text } from "@/components/text/text";
import { Suspense } from "react";
import { Heading } from "@/components/heading/heading";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MyPosts } from "@/components/page-components/my-profile/my-posts/my-posts";
export default function AdminPosts() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <Heading>Notiv Admin</Heading>

      <div className="min-h-screen  w-full max-w-3xl p-12 flex flex-col items-center gap-2">
        <div className="flex flex-row justify-between items-center w-full">
          <Text>Posts</Text>
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

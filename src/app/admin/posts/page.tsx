/** @format */

import { Text } from "@/components/Text/Text";
import { Suspense } from "react";
import { AdminPostsList } from "../components/AdminPostsList/AdminPostsList";
import { Heading } from "@/components/Heading/Heading";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function AdminPosts() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center p-8">
      <Heading>Notiv Admin</Heading>

      <div className="min-h-screen  w-full max-w-3xl p-12 flex flex-col items-center gap-2">
        <div className="flex flex-row justify-between items-center w-full">
          <Text>Posts</Text>
          <Link href="/admin/posts/new">
            <Button>
              <Plus />
              Novo post
            </Button>
          </Link>
        </div>

        <Suspense fallback={<Text className="font-bold animate-pulse uppercase">Loading</Text>}>
          <AdminPostsList />
        </Suspense>
      </div>
    </div>
  );
}

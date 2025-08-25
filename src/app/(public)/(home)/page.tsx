/** @format */

import { Heading } from "@/components/heading/heading";
import { PostsList } from "@/components/page-components/home/posts-list/posts-list";
import { PostCard } from "@/components/blocks/post-card";
import { Text } from "@/components/text/text";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center p-8">
      <div className=" min-h-screen max-w-[1000px] p-12 flex flex-col gap-4">
        <Heading>Notiv</Heading>

        {/* TODO: Buscar do database */}
        <PostCard.Root variant="row" className="hover:bg-zinc-900">
          <PostCard.Image src="/images/bryen_0.png" alt="post_title" />
          <PostCard.Content>
            {/* <Post.Time /> */}
            <PostCard.Heading>Lorem ipsum dolor</PostCard.Heading>
            <PostCard.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, optio quae!
              Laborum fugiat modi animi, dolore quae aut, molestias vel veniam minima ipsam earum.
              Placeat non et nostrum architecto suscipit.
            </PostCard.Text>
          </PostCard.Content>
        </PostCard.Root>

        <Suspense fallback={<Text className="font-bold animate-pulse uppercase">Loading</Text>}>
          <PostsList />
        </Suspense>
      </div>
    </div>
  );
}

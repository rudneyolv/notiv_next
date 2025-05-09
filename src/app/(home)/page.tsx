import { Heading } from "@/components/Heading/Heading";
import { Post } from "@/components/Post";
import { Text } from "@/components/Text/Text";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-zinc-900 min-h-screen flex flex-col items-center justify-center p-8">
      <div className=" min-h-screen max-w-[1000px] p-12 flex flex-col gap-4">
        <Heading>Teste</Heading>
        {/* <Text className="text-zinc-100">Home</Text> */}

        <Post.Root>
          <Post.Image src="/images/bryen_0.png" alt="post_title" />
          <Post.Content>
            <Post.Time />
            <Post.Heading>Lorem ipsum dolor</Post.Heading>
            <Post.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur, optio quae! Laborum fugiat modi animi, dolore quae
              aut, molestias vel veniam minima ipsam earum. Placeat non et
              nostrum architecto suscipit.
            </Post.Text>
          </Post.Content>
        </Post.Root>
      </div>
    </div>
  );
}

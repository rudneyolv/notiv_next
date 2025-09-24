/** @format */
"use client";

import { PostFormData } from "@/schemas/posts/post-form-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PostForm from "@/components/forms/post-form/post-form";
import { useApiQueries } from "@/hooks/queries";

export default function NewPost() {
  const router = useRouter();

  const { mutate: createPost, isPending, error } = useApiQueries.posts.create();

  const onSubmit = async (postData: PostFormData) => {
    createPost(postData, {
      onSuccess: () => {
        toast.success("Post criado com sucesso!");
        router.push("/my-profile/posts");
      },
    });
  };

  return (
    <div className="mt-8">
      <PostForm isPending={isPending} error={error} onSubmit={onSubmit} />
    </div>
  );
}

/** @format */
"use client";

import { FormPostData } from "@/schemas/admin/posts/new-post-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PostForm from "@/components/forms/post-form/PostForm";
import { useApiQueries } from "@/hooks/queries";

export default function NewPost() {
  const { mutate: createPost, isPending, error } = useApiQueries.posts.create();

  const router = useRouter();

  const onSubmit = async (postData: FormPostData) => {
    createPost(postData, {
      onSuccess: () => {
        toast.success("Post criado com sucesso!");
        router.push("/my-profile/posts");
      },
    });
  };

  return <PostForm isPending={isPending} error={error} onSubmit={onSubmit} />;
}

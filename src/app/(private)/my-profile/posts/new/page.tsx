/** @format */
"use client";

import { FormPostData } from "@/schemas/admin/posts/new-post-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PostForm from "@/components/forms/post-form/post-form";
import { useApiQueries } from "@/hooks/queries";
import { ApiError } from "@/schemas/api-error-schema";
import { utils } from "@/utils";

export default function NewPost() {
  let parsedError: ApiError | null = null;

  const router = useRouter();

  const { mutate: createPost, isPending, error } = useApiQueries.posts.create();

  if (error) {
    parsedError = utils.errors.parseApiError(error);
  }

  const onSubmit = async (postData: FormPostData) => {
    createPost(postData, {
      onSuccess: () => {
        toast.success("Post criado com sucesso!");
        router.push("/my-profile/posts");
      },
    });
  };

  return <PostForm isPending={isPending} error={parsedError} onSubmit={onSubmit} />;
}

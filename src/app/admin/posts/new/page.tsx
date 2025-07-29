/** @format */
"use client";

import { FormPostData } from "@/schemas/admin/posts/new-post-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PostForm from "@/components/PageComponents/admin/PostForm/PostForm";
import { isError } from "@/utils/errors";
import { useAdminPosts } from "@/hooks/queries/admin/use-admin-posts";

export default function NewPost() {
  const { mutate: createPost, isPending, error } = useAdminPosts.create();
  const router = useRouter();

  const onSubmit = (postData: FormPostData) => {
    createPost(postData, {
      onSuccess: () => {
        toast.success("Post criado com sucesso!");
        router.push("/admin/posts");
      },

      onError: (error: unknown) => {
        toast.error(isError(error) ? error.message : "Erro ao criar post");
      },
    });
  };

  return <PostForm isPending={isPending} error={error} onSubmit={onSubmit} />;
}

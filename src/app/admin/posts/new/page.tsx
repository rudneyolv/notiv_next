/** @format */
"use client";

import { useCreateNewPost } from "@/hooks/api/requests/admin/use-admin-requests";
import { FormPostData } from "@/schemas/admin/posts/new-post-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PostForm from "@/components/PageComponents/admin/PostForm/PostForm";

export default function NewPost() {
  const { mutate: createPost, isPending, error } = useCreateNewPost();
  const router = useRouter();

  const onSubmit = (postData: FormPostData) => {
    createPost(postData, {
      onSuccess: () => {
        toast.success("Post criado com sucesso!");
        router.push("/admin/posts");
      },

      onError: () => {
        toast.error("Erro ao criar post");
      },
    });
  };

  return <PostForm isPending={isPending} error={error} onSubmit={onSubmit} />;
}

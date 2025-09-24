/** @format */
"use client";

import { Button } from "@/components/ui/button";
import { PostFormData } from "@/schemas/posts/post-form-schema";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useApiQueries } from "@/hooks/queries";
import PostForm from "@/components/forms/post-form/post-form";
import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";

export default function EditPost({ slug }: { slug: string }) {
  const router = useRouter();

  const { data: postData, isLoading, error: fetchError } = useApiQueries.posts.fetchBySlug(slug);
  const { mutate: editPost, isPending, error: mutateError } = useApiQueries.posts.update();

  const onSubmit = (editPostData: PostFormData) => {
    if (!postData) return;

    // ID passado para saber qual post atualizar
    // imageUrl existente para manter a imagem atual caso o usuário não envie uma nova image(File)
    const updatePostDto = { ...editPostData, id: postData.id, imageUrl: postData.imageUrl };

    editPost(updatePostDto, {
      onSuccess: () => {
        toast.success("Post editado com sucesso!");
        router.push("/my-profile/posts");
      },
    });
  };

  if (fetchError) {
    return (
      <div className="h-dvh w-dvw flex flex-col items-center justify-center">
        <ApiErrorMessages messages={fetchError.messages} />

        <Button onClick={() => router.back()} variant="outline">
          Voltar
        </Button>
      </div>
    );
  }

  if (isLoading || !postData)
    return (
      <div className="h-dvh w-dvw flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  return (
    <div className="mt-8">
      <PostForm
        postData={{
          title: postData.title,
          summary: postData.summary,
          image: postData.imageUrl,
          published: postData.published,
          content: postData.content,
        }}
        isPending={isPending}
        error={mutateError}
        onSubmit={onSubmit}
      />
    </div>
  );
}

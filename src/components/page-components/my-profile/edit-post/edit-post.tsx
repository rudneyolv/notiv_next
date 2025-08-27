/** @format */
"use client";

import { Button } from "@/components/ui/button";
import { FormPostData } from "@/schemas/admin/posts/new-post-schema";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useApiQueries } from "@/hooks/queries";
import { ApiError } from "@/schemas/api-error-schema";
import { utils } from "@/utils";
import PostForm from "@/components/forms/post-form/post-form";
import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";

export default function EditPost({ slug }: { slug: string }) {
  let parsedMutateError: ApiError | null = null;

  const router = useRouter();

  const { data: postData, isLoading, error: fetchError } = useApiQueries.posts.fetchBySlug(slug);
  const { mutate: editPost, isPending, error: mutateError } = useApiQueries.posts.edit();

  if (mutateError) {
    parsedMutateError = utils.errors.parseApiError(mutateError);
  }

  const onSubmit = (editPostData: FormPostData) => {
    if (!postData) return;

    //TODO: Checar melhorias na parte de manter imageUrl

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
    const parsedFetchError = utils.errors.parseApiError(fetchError);

    return (
      <div className="h-dvh w-dvw flex flex-col items-center justify-center">
        <ApiErrorMessages messages={parsedFetchError.messages} />

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
    <PostForm
      postData={{
        title: postData.title,
        summary: postData.summary,
        image: postData.imageUrl,
        published: postData.published,
        content: postData.content,
      }}
      isPending={isPending}
      error={parsedMutateError}
      onSubmit={onSubmit}
    />
  );
}

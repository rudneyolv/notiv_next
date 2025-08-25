/** @format */
"use client";

import { Text } from "@/components/text/text";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/hooks/queries/posts-queries";
import { FormPostData } from "@/schemas/admin/posts/new-post-schema";
import { isError } from "@/utils/errors";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PostForm from "../../../forms/post-form/PostForm";
import { useApiQueries } from "@/hooks/queries";

// CONTINUE: Seguir com a parte de edição do post
export default function EditPost({ slug }: { slug: string }) {
  const {
    data: postData,
    isLoading: isLoadingPostData,
    error: fetchPostError,
  } = useApiQueries.posts.fetchBySlug(slug);

  const { mutate: editPost, isPending, error: mutateError } = useApiQueries.posts.edit();
  const router = useRouter();

  const onSubmit = (editPostData: FormPostData) => {
    if (!postData) return;

    // Passamos o ID para saber qual post atualizar
    // e a imageUrl existente para manter a imagem atual caso o usuário não envie uma nova
    editPost(
      { ...editPostData, id: postData.id, imageUrl: postData.imageUrl },
      {
        onSuccess: () => {
          toast.success("Post editado com sucesso!");
          router.push("/my-profile/posts");
        },
      }
    );
  };

  if (isLoadingPostData || !postData)
    return (
      <div className="h-dvh w-dvw flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  if (fetchPostError) {
    return (
      <div className="h-dvh w-dvw flex flex-col items-center justify-center">
        <Text className="text-destructive">{fetchPostError?.message || `Erro ao buscar post`}</Text>
        <Button onClick={() => router.back()} variant="outline">
          Voltar
        </Button>
      </div>
    );
  }

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
      error={mutateError}
      onSubmit={onSubmit}
    />
  );
}

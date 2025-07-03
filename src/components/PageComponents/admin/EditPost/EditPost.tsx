/** @format */
"use client";

import PostForm from "@/components/PageComponents/admin/PostForm/PostForm";
import { Text } from "@/components/Text/Text";
import { Button } from "@/components/ui/button";
import { useEditPost, useFetchPostBySlug } from "@/hooks/api/requests/admin/use-admin-requests";
import { FormPostData } from "@/schemas/admin/posts/new-post-schema";
import { isError } from "@/utils/errors";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditPost({ slug }: { slug: string }) {
  const {
    data: postData,
    isLoading: isLoadingPostData,
    error: fetchPostError,
  } = useFetchPostBySlug(slug);
  const { mutate: editPost, isPending, error: mutateError } = useEditPost();
  const router = useRouter();

  const onSubmit = (newPostData: FormPostData) => {
    if (!postData) return;

    const payload = {
      ...newPostData,

      //Campos que não são modificados pelo postForm, portanto não são editados
      slug: postData?.slug,
      created_at: postData?.created_at,
      updated_at: postData?.updated_at,
      id: postData?.id,
      image: postData.image, //TODO: Remover quando o form enviar imagem
    };

    editPost(payload, {
      onSuccess: () => {
        toast.success("Post editado com sucesso!");
        router.push("/admin/posts");
      },

      onError: (error: unknown) => {
        toast.error(isError(error) ? error.message : "Erro ao editar post");
      },
    });
  };

  if (isLoadingPostData)
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
    <PostForm postData={postData} isPending={isPending} error={mutateError} onSubmit={onSubmit} />
  );
}

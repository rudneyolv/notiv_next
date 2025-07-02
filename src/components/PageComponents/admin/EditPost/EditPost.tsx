/** @format */
"use client";

import PostForm from "@/components/PageComponents/admin/PostForm/PostForm";
import { Text } from "@/components/Text/Text";
import { Button } from "@/components/ui/button";
import { useEditPost, useFetchPostBySlug } from "@/hooks/api/requests/admin/use-admin-requests";
import { FormPostData } from "@/schemas/admin/posts/new-post-schema";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditPost({ slug }: { slug: string }) {
  const { data: postData, isLoading, error: fetchError } = useFetchPostBySlug(slug);
  const { mutate: editPost, isPending, error: mutateError } = useEditPost();
  const router = useRouter();

  const onSubmit = (formPostData: FormPostData) => {
    if (!postData) return;

    const payload = {
      ...formPostData,

      //Campos que não são modificados pelo postForm
      slug: postData?.slug,
      created_at: postData?.created_at,
      updated_at: postData?.updated_at,
      published: postData?.published,
      image_url: postData?.image_url,
      id: postData?.id,
    };

    editPost(payload, {
      onSuccess: () => {
        toast.success("Post editado com sucesso!");
        router.push("/admin/posts");
      },

      onError: (error) => {
        console.log("Error só que no mutate", error);
        toast.error("Erro ao editar post");
      },
    });
  };

  if (isLoading)
    return (
      <div className="h-dvh w-dvw flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  if (fetchError) {
    return (
      <div className="h-dvh w-dvw flex flex-col items-center justify-center">
        <Text className="text-destructive">{fetchError?.message || `Erro ao buscar post`}</Text>
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

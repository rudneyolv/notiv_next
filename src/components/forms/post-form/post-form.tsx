/** @format */
"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/image-upload/image-upload";
import { ClientMarkdownEditor } from "@/components/markdown-editor/client-markdown-editor";
import { PostFormData, PostFormSchema } from "@/schemas/posts/post-form-schema";
import { Checkbox } from "@/components/ui/checkbox";
import { ApiError } from "@/schemas/api/api-error-schema";
import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { FormContainerStyles, FormStyles } from "../default-styles";

interface PostFormProps {
  postData?: PostFormData;
  onSubmit: (postData: PostFormData) => void;
  isPending: boolean;
  error: ApiError | null;
}

export default function PostForm({ postData, onSubmit, isPending, error }: PostFormProps) {
  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    mode: "onBlur",
    defaultValues: postData ?? {
      title: "",
      summary: "",
      image: null,
      published: true,
    },
  });

  return (
    <div className={FormContainerStyles()}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={FormStyles()}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Título do post</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="Digite o título do post" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Resumo do post</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    placeholder="Escreva um breve resumo do conteúdo do post"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Contéudo do post</FormLabel>
                <FormControl>
                  <ClientMarkdownEditor
                    onChange={field.onChange}
                    value={field.value}
                    onBlur={field.onBlur}
                    height={400}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <ImageUpload
                    maxSizeInKb={1024}
                    onChange={(data) => form.setValue("image", data, { shouldValidate: true })}
                    value={field.value}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="w-full flex">
                <FormControl>
                  <Checkbox
                    disabled={isPending}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Publicar o post</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <ApiErrorMessages messages={error.messages} />}

          {!isPending && (
            <Button variant={error ? "destructive" : "default"} className="w-full" type="submit">
              Confirmar
            </Button>
          )}

          {isPending && (
            <Button disabled className="w-full" type="submit">
              <Loader2 className="animate-spin" /> Carregando
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

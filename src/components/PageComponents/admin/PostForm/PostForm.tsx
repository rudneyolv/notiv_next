/** @format */
"use client";

import { Text } from "@/components/Text/Text";
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
import { ImageUpload } from "@/components/ImageUpload/ImageUpload";
import { ClientMarkdownEditor } from "@/components/MarkdownEditor/ClientMarkdownEditor";
import { FormPostData, PostSchema } from "@/schemas/admin/posts/new-post-schema";
import { PostFormContainerStyles, PostFormStyles } from "./PostForm-Styles";
import { Checkbox } from "@/components/ui/checkbox";

interface PostFormProps {
  postData?: FormPostData;
  onSubmit: (postData: FormPostData) => void;
  isPending: boolean;
  error: Error | null;
}

export default function PostForm({ postData, onSubmit, isPending, error }: PostFormProps) {
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    mode: "onBlur",
    defaultValues: postData ?? {
      title: "",
      author_name: "",
      author_last_name: "",
      summary: "",
      image: null,
      published: true,
    },
  });

  return (
    <div className={PostFormContainerStyles()}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={PostFormStyles()}>
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
            name="author_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome do autor</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Digite o primeiro nome do autor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author_last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Sobrenome do autor</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Digite o sobrenome do autor"
                    {...field}
                  />
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

          {/* TODO: Checar como exibir a imagem em um caso onde o post já vem com uma image url */}
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
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Publicar o post</FormLabel>

                <FormMessage />
              </FormItem>
            )}
          />

          {error && <Text className="text-destructive">{error.message}</Text>}

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

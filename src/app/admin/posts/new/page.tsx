/** @format */
"use client";

import { Text } from "@/components/Text/Text";
import { Suspense, useEffect, useRef, useState } from "react";
import { Heading } from "@/components/Heading/Heading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";

import dynamic from "next/dynamic";

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
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { ImageUpload } from "@/components/ImageUpload/ImageUpload";
import { MarkdownEditor } from "@/components/MarkdownEditor/MarkdownEditor";
import { ClientMarkdownEditor } from "@/components/MarkdownEditor/ClientMarkdownEditor";
import { useCreateNewPost } from "@/hooks/api/requests/admin/use-admin-requests";
import { NewPostSchema } from "@/schemas/admin/posts/new-post-schema";

export default function AdminPosts() {
  const form = useForm<z.infer<typeof NewPostSchema>>({
    resolver: zodResolver(NewPostSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      author_name: "",
      author_last_name: "",
      summary: "",
      image: null,
    },
  });

  const { mutate: createPost } = useCreateNewPost();

  const onSubmit = (values: z.infer<typeof NewPostSchema>) => {
    createPost(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  console.log(form.watch());

  return (
    <div className="bg-zinc-950 min-h-screen flex flex-col items-center justify-center p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" p-4 rounded-xl w-full max-w-2xl flex flex-col items-center gap-4"
        >
          {/* <pre>{JSON.stringify(form.watch(), null, 2)}</pre> */}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Título do post</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o título do post" {...field} />
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
                  <Input placeholder="Digite o primeiro nome do autor" {...field} />
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
                  <Input placeholder="Digite o sobrenome do autor" {...field} />
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
                  <Textarea placeholder="Escreva um breve resumo do conteúdo do post" {...field} />
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
                    onChange={(data) => form.setValue("image", data, { shouldValidate: false })}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Criar post
          </Button>
        </form>
      </Form>
    </div>
  );
}

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

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "O título deve ter no mínimo 5 caracteres." })
    .max(100, { message: "O título deve ter no máximo 100 caracteres." }),

  summary: z
    .string()
    .min(10, { message: "O resumo deve ter no mínimo 10 caracteres." })
    .max(300, { message: "O resumo deve ter no máximo 300 caracteres." }),

  author_name: z
    .string()
    .min(2, { message: "Nome do autor muito curto." })
    .max(50, { message: "Nome do autor muito longo." }),

  author_last_name: z
    .string()
    .min(2, { message: "Sobrenome do autor muito curto." })
    .max(50, { message: "Sobrenome do autor muito longo." }),

  content: z
    .string()
    .min(30, { message: "O conteúdo deve ter pelo menos 30 caracteres." })
    .max(20_000, { message: "O conteúdo é muito longo." }),

  post_image: z.any(),
});

export default function AdminPosts() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      author_name: "",
      author_last_name: "",
      summary: "",
      post_image: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
                  <MDEditor
                    className="whitespace-pre-wrap font-sofia"
                    preview="edit"
                    onChange={field.onChange}
                    value={field.value}
                    onBlur={field.onBlur}
                    height={400}
                    previewOptions={{
                      rehypePlugins: [[rehypeSanitize]],
                      remarkPlugins: [[remarkGfm]],
                    }}
                    extraCommands={[]}
                    hideToolbar={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="post_image"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  {/* TODO: adicionar lógica para remoção de imagem e melhorar error handling*/}
                  <ImageUpload
                    maxSizeInKb={1024}
                    onAddImage={(data) =>
                      form.setValue("post_image", data.file, { shouldValidate: false })
                    }
                    onRemoveImage={() =>
                      form.setValue("post_image", null, { shouldValidate: false })
                    }
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

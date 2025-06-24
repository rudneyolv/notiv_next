/** @format */

import { NewPostData } from "@/schemas/admin/posts/new-post-schema";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // separa letras de acentos
    .replace(/[\u0300-\u036f]/g, "") // remove os acentos
    .replace(/[^a-z0-9 -]/g, "") // remove caracteres especiais
    .trim()
    .replace(/\s+/g, "-") // troca espaços por hífens
    .replace(/-+/g, "-"); // remove hífens duplos
}

export async function createNewPost(data: NewPostData) {
  const { title, summary, author_name, author_last_name, content } = data;

  // Utilizar quando estiver com um backend real
  // const formData = new FormData();

  // formData.append("title", title);
  // formData.append("summary", summary);
  // formData.append("author_name", author_name);
  // formData.append("author_last_name", author_last_name);
  // formData.append("content", content);

  // if (image) {
  //   formData.append("image", image);
  // }

  // const response = await fetch("", {
  //   method: "POST",
  //   body: formData,
  // });

  //   "id": "be3f14a1-0105-4e2e-bfc9-133a05e7bda6",
  // "title": "10 hábitos para aumentar sua produtividade",
  // "slug": "10-habitos-para-aumentar-sua-produtividade",
  // "excerpt": "o Next.js já vem com várias decisões prontas, permitindo que você comece a desenvolver mais rapidamente.",
  // "content": "o Next.js já vem com várias decisões prontas, permitindo que você comece a desenvolver mais rapidamente.",
  // "coverImageUrl": "/images/bryen_2.png",
  // "published": false,
  // "createdAt": "2025-01-07T22:54:10",
  // "updatedAt": "2025-01-07T22:54:10",
  // "author": "Carla Mendes"

  const response = await fetch(`${apiUrl}/posts`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      slug: slugify(title),
      excerpt: summary,
      author: `${author_name} ${author_last_name}`,
      content: content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      coverImageUrl: "/images/bryen_0.png",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //TODO: adaptar conforme backend
  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(error.message || "Erro desconhecido");
  }

  const responseData = await response.json();

  return responseData;
}

/** @format */

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
/** @format */

import { PostDataProps } from "@/interfaces/posts/post-interface";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Check, Pen, Trash, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AdminPostsTable({ posts }: { posts: PostDataProps[] }) {
  const [postToDelete, setPostToDelete] = useState<PostDataProps | null>(null);

  // Função para lidar com a deleção
  const handleDeletePost = async () => {
    if (!postToDelete) return;
    console.log("Deletando de verdade o post:", postToDelete.id);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setPostToDelete(null);
  };

  const columnHelper = createColumnHelper<PostDataProps>();

  const columns = [
    columnHelper.accessor("title", {
      header: "Título",
      cell: (info) => (
        <p className="max-w-[300px] truncate" title={info.getValue()}>
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor("author", {
      header: "Autor",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("published", {
      header: "Publicado",
      cell: (info) => {
        const value = info.getValue();
        return value ? (
          <Check className="h-4 text-green-500 text-center w-full" />
        ) : (
          <X className="h-4 text-red-500 w-full" />
        );
      },
    }),

    columnHelper.display({
      id: "delete_column",
      header: "Excluir",
      cell: ({ row }) => {
        const post = row.original;

        return (
          <Button
            onClick={() => setPostToDelete(post)}
            className="duration-300 hover:text-red-500 transition-colors"
            variant="ghost"
          >
            <Trash className="h-4 w-4" />
          </Button>
        );
      },
    }),

    columnHelper.display({
      id: "delete",
      header: "Editar",
      cell: ({ row }) => {
        const post = row.original;

        return (
          <Link href={`/admin/post/${post.slug}/edit`}>
            <Button
              className="duration-300 hover:text-purple-500 transition-colors"
              variant="ghost"
            >
              <Pen className="h-4 w-4" />
            </Button>
          </Link>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 rounded-xl shadow-xl">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-zinc-600 duration-500 rounded-xl select-none transition-all"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-zinc-100">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="rounded-xl">
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="
               border-zinc-600 transition-transform duration-300 rounded-xl
               overflow-hidden select-none hover:bg-transparent hover:-translate-y-0.5
               will-change-transform"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="border-none text-zinc-300">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!postToDelete} onOpenChange={(isOpen) => !isOpen && setPostToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Você tem certeza?</DialogTitle>
            <DialogDescription>
              Você está prestes a deletar a publicação "{postToDelete?.title}". Essa ação não pode
              ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full flex flex-row gap-2 items-center justify-end pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button
              variant="destructive" // Variante 'destructive' é semanticamente melhor para exclusão
              onClick={handleDeletePost}
            >
              Sim, excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

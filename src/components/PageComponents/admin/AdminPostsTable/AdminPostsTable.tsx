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
import { useAdminPosts } from "@/hooks/queries/admin/use-admin-posts";
/** @format */

import { PostDataProps } from "@/interfaces/posts/post-interface";
import { isError } from "@/utils/errors";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Check, Loader2, Pen, Trash, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export function AdminPostsTable({ posts }: { posts: PostDataProps[] }) {
  const [postToDelete, setPostToDelete] = useState<PostDataProps | null>(null);
  const { mutate: deletePost, isPending: isPendingDeletePost } = useAdminPosts.delete();

  // Função para lidar com a deleção
  const handleDeletePost = async () => {
    if (!postToDelete) return;
    deletePost(postToDelete.id, {
      onSuccess: () => {
        toast.success("Post deletado com sucesso");
        setPostToDelete(null);
      },

      onError: (error: unknown) => {
        toast.error(isError(error) ? error.message : "Erro ao excluir post");
      },
    });
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

    columnHelper.accessor("author_name", {
      header: "Autor",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("author_last_name", {
      header: "Sobrenome",
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
          <Link href={`/admin/posts/edit/${post.slug}`}>
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
              {`Você está prestes a deletar o post "${postToDelete?.title}". Essa ação não pode ser
              desfeita.`}
            </DialogDescription>
          </DialogHeader>

          <div className="w-full flex flex-row gap-2 items-center justify-end pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            {isPendingDeletePost && (
              <Button variant="destructive" onClick={handleDeletePost}>
                <Loader2 className="animate-spin" /> Carregando
              </Button>
            )}

            {!isPendingDeletePost && (
              <Button variant="destructive" onClick={handleDeletePost}>
                Sim, excluir
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

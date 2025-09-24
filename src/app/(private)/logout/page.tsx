/** @format */
"use client";

import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApiQueries } from "@/hooks/queries";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LogoutPage() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { mutate: logout, isPending, error } = useApiQueries.auth.logout();
  const router = useRouter();

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        setIsOpen(false);
        toast.success("Deslogado com sucesso!");
      },
    });
  };

  return (
    <div className="h-dvh w-dvw bg-background">
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            router.back();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Você tem certeza?</DialogTitle>
            <DialogDescription>Você tem certeza que deseja sair da sua conta?</DialogDescription>
          </DialogHeader>

          {error && <ApiErrorMessages messages={error.messages} />}

          <div className="w-full flex flex-row gap-2 items-center justify-end pt-4">
            <DialogClose asChild>
              <Button disabled={isPending} variant="outline">
                Cancelar
              </Button>
            </DialogClose>

            <Button isLoading={isPending} variant="destructive" onClick={handleLogout}>
              Sair da conta
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

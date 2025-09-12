/** @format */
"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormContainerStyles, FormStyles } from "../default-styles";
import { Button } from "@/components/ui/button";
import { useApiQueries } from "@/hooks/queries";
import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { utils } from "@/utils";
import { toast } from "sonner";
import { UpdateProfileDto, UpdateProfileSchema } from "@/schemas/users/update-profile-schema";
import { User } from "@/types/users-types";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Text } from "@/components/text/text";

export function UpdateProfileForm({ userData }: { userData?: User }) {
  const router = useRouter();
  const form = useForm<UpdateProfileDto>({
    resolver: zodResolver(UpdateProfileSchema),
    mode: "onTouched",
    defaultValues: userData ?? {
      name: "",
    },
  });

  const { mutate: updateProfile, isPending, error } = useApiQueries.users.current.update();

  const onSubmit = (data: UpdateProfileDto) => {
    updateProfile(data, {
      onSuccess: () => {
        toast.success("Perfil atualizado com sucesso!");
        router.back();
      },
    });
  };

  return (
    <div className={FormContainerStyles()}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn(FormStyles(), "max-w-80")}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="Insira o seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Text className="text-muted-foreground italic">
            Ao atualizar seu perfil a mudança é imediata. Porém, pode levar um tempo até os novos
            dados refletir nos seus posts.
          </Text>

          {error && <ApiErrorMessages messages={utils.errors.parseApiError(error).messages} />}

          <Button isLoading={isPending} className="w-full">
            Confirmar alterações
          </Button>
        </form>
      </Form>
    </div>
  );
}

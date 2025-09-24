/** @format */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputPassword from "@/components/ui/input-password";
import { UpdatePasswordDto } from "@/schemas/auth/update-password-schema";
import { UpdatePasswordSchema } from "@/schemas/auth/update-password-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormContainerStyles, FormStyles } from "../default-styles";
import { Button } from "@/components/ui/button";
import { useApiQueries } from "@/hooks/queries";
import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UpdatePasswordForm() {
  const router = useRouter();

  const form = useForm<UpdatePasswordDto>({
    resolver: zodResolver(UpdatePasswordSchema),
    mode: "onTouched",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const { mutate: changePassword, isPending, error } = useApiQueries.auth.updatePassword();

  const onSubmit = (data: UpdatePasswordDto) => {
    changePassword(data, {
      onSuccess: () => {
        router.push("/login");
        toast.success("Senha alterada com sucesso. Por favor, efetue login novamente!");
      },
    });
  };

  return (
    <div className={FormContainerStyles()}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={FormStyles()}>
          <FormField
            name="currentPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Senha atual</FormLabel>
                <FormControl>
                  <InputPassword
                    disabled={isPending}
                    placeholder="Insira sua senha atual"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="newPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nova senha</FormLabel>
                <FormControl>
                  <InputPassword
                    disabled={isPending}
                    placeholder="Insira sua nova senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <ApiErrorMessages messages={error.messages} />}

          <Button isLoading={isPending} className="w-full">
            Confirmar alteração
          </Button>
        </form>
      </Form>
    </div>
  );
}

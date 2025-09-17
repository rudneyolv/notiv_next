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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormContainerStyles, FormStyles } from "../default-styles";
import { Button } from "@/components/ui/button";
import { useApiQueries } from "@/hooks/queries";
import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { utils } from "@/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UpdateEmailDto, UpdateEmailSchema } from "@/schemas/auth/update-email-schema";
import { Text } from "@/components/text/text";

export function UpdateEmailForm() {
  const form = useForm<UpdateEmailDto>({
    resolver: zodResolver(UpdateEmailSchema),
    mode: "onTouched",
    defaultValues: {
      newEmail: "",
    },
  });

  const { mutate: updateProfile, isPending, error } = useApiQueries.auth.updateEmail();

  const onSubmit = (data: UpdateEmailDto) => {
    updateProfile(data, {
      onSuccess: () => {
        toast.success(
          "Solicitação recebida com sucesso! Confira sua caixa de entrada para confirmar a alteração."
        );
      },
    });
  };

  return (
    <div className={FormContainerStyles()}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn(FormStyles(), "max-w-80")}>
          <FormField
            name="newEmail"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="Insira o seu novo e-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Text className="text-muted-foreground italic">
            Após enviar esta alteração, você receberá um e-mail de confirmação no novo endereço.
            Abra-o para concluir a atualização do seu e-mail.
          </Text>

          {error && <ApiErrorMessages messages={utils.errors.parseApiError(error).messages} />}

          <Button isLoading={isPending} className="w-full">
            Confirmar alteração
          </Button>
        </form>
      </Form>
    </div>
  );
}

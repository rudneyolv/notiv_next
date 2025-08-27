/** @format */
"use client";

import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useApiQueries } from "@/hooks/queries";
import { RegisterFormType, RegisterSchema } from "@/schemas/admin/register-schema";
import { utils } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: register, isPending, error } = useApiQueries.auth.register();

  const handleSubmit = (values: RegisterFormType) => {
    register(values, {
      onSuccess: () => {
        toast.success("Registro efetuado com sucesso.");
        router.push("/login");
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="
          w-full max-w-80
          flex flex-col justify-start items-start gap-4
          p-4 border rounded-xl
        "
      >
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Insira o seu nome</FormLabel>

              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Seu e-mail</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Sua senha</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <ApiErrorMessages messages={utils.errors.parseApiError(error).messages} />}

        <Button className="w-full" type="submit" isLoading={isPending}>
          Registrar-se
        </Button>
      </form>
    </Form>
  );
}

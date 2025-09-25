/** @format */
"use client";

import { ApiErrorMessages } from "@/components/api-error-messages/api-error-messages";
import { Text } from "@/components/text/text";
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
import InputPassword from "@/components/ui/input-password";
import { env } from "@/constants/env";
import { useApiQueries } from "@/hooks/queries";
import { RegisterDto, RegisterSchema } from "@/schemas/auth/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterDto>({
    resolver: zodResolver(RegisterSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: register, isPending, error } = useApiQueries.auth.register();

  const handleSubmit = (values: RegisterDto) => {
    register(values, {
      onSuccess: () => {
        router.push("/confirm-email");
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
                <InputPassword {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <ApiErrorMessages messages={error.messages} />}

        {env.NEXT_PUBLIC_ALLOW_NEW_USERS === "0" && (
          <Text className="text-destructive">O cadastro de novos usuários está desabilitado</Text>
        )}

        <Button className="w-full" type="submit" isLoading={isPending}>
          Registrar-se
        </Button>

        <div className="w-full flex flex-row gap-1 justify-center">
          <Text className="text-muted-foreground">Já possui uma conta?</Text>

          <Link href="/login" className="hover:text-purple-400">
            Entrar
          </Link>
        </div>
      </form>
    </Form>
  );
}

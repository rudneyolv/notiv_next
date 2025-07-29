/** @format */
"use client";

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
import { useAdminAuth } from "@/hooks/queries/admin/use-admin-auth";
import { RegisterFormType, RegisterSchema } from "@/schemas/admin/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function RegisterForm() {
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: register, isPending } = useAdminAuth.register();

  const handleSubmit = (values: RegisterFormType) => {
    register(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="
          w-full max-w-80
          flex flex-col items-center gap-4
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

        <Button className="w-full" type="submit" isLoading={isPending}>
          Registrar-se
        </Button>
      </form>
    </Form>
  );
}

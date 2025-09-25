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
import { useApiQueries } from "@/hooks/queries";
import { LoginDto, LoginSchema } from "@/schemas/auth/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginDto>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: Login, isPending, error } = useApiQueries.auth.login();

  const handleSubmit = (data: LoginDto) => {
    Login(data, {
      onSuccess: () => {
        toast.success("Login com sucesso!");
        router.push("/my-profile/posts");
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="
          w-full max-w-80
          flex flex-col items-center gap-4
          p-4 border rounded-xl
        "
        onSubmit={form.handleSubmit(handleSubmit)}
      >
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

        <Button className="w-full" type="submit" isLoading={isPending}>
          Login
        </Button>

        <div className="w-full flex flex-row gap-1 justify-center">
          <Text className="text-muted-foreground">Não possui uma conta?</Text>

          <Link href="/register" className="hover:text-purple-400">
            Registre-se
          </Link>
        </div>
      </form>
    </Form>
  );
}

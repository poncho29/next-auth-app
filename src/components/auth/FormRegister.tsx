'use client';

import { useState, useTransition } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from 'zod';

import { registerAction } from "@/actions/auth";

import { registerSchema } from '@/lib/zod';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from "@/components/ui/form";

export const FormRegister = () => {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError(null);
    startTransition(async() => {
      const res = await registerAction(values);
      
      if (!res.success) {
        setError(res.message);
      } else {
        router.push('/admin');
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese su nombre completo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <FormMessage>{error}</FormMessage>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className='w-full'
        >
          Enviar
        </Button>

      </form>
      
      <div className="flex justify-center mt-4">
        <Link
          href="/auth/login"
          className="text-sm underline"
        >
          Iniciar sesión
        </Link>
      </div>
    </Form>
  )
}

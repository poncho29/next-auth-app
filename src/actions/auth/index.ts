"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { loginSchema } from "@/lib/zod";

import { signIn } from "@/auth";

export const login = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      ...values,
      redirect: false,
    });

    return { success: true, message: "Inicio de sesión exitoso" };
  } catch (error) {
    console.log(error);
    
    if (error instanceof AuthError) {
      const message = error?.cause?.err?.message || "Error al iniciar sesión";
      return { success: false, message };
    }

    return { success: false, message: "Error al iniciar sesión" };
  }
}
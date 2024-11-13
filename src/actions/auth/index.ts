"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { loginSchema, registerSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";

import { signIn } from "@/auth";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      ...values,
      redirect: false,
    });

    return { success: true, message: "Inicio de sesión exitoso" };
  } catch (error) {
    console.log(error);
    const defaultMessage = "Error al iniciar sesión";

    if (error instanceof AuthError) {
      const message = error?.cause?.err?.message || defaultMessage;
      return { success: false, message };
    }

    return { success: false, message: defaultMessage };
  }
}

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
  try {
    const { data, success } = registerSchema.safeParse(values);

    if (!success) {
      console.log("Error en validacion de credenciales");
      return { success: false, message: "Error en validacion de credenciales" };
    }

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      console.log("El usuario ya existe");
      return { success: false, message: "El usuario ya existe" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { success: true, message: "Registro exitoso" };
  } catch (error) {
    console.log(error);
    const defaultMessage = "Error al registrarse";

    if (error instanceof AuthError) {
      const message = error?.cause?.err?.message || defaultMessage;
      return { success: false, message };
    }

    return { success: false, message: defaultMessage };
  }
}
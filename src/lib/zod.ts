import { object, string } from "zod"
 
export const loginSchema = object({
  email: string({ required_error: "El correo electrónico es requerido" })
  .email("Correo electrónico no válido")
    .min(1, "El correo electrónico es requerido"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener más de 8 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
})

export const registerSchema = object({
  names: string({ required_error: "El nombre es requerido" })
    .min(1, "El nombre es requerido")
    .max(64, "El nombre debe tener menos de 64 caracteres"),
  lastname: string({ required_error: "El apellido es obligatorio" })
    .min(1, "El apellido es obligatorio")
    .max(64, "El apellido debe tener menos de 64 caracteres"),
  email: string({ required_error: "El correo electrónico es requerido" })
    .email("Invalid email")
    .min(1, "El correo electrónico es requerido"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener más de 8 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
})
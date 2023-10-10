import {z} from "zod";

const schemas = {
  email: z.string().email("El email no es valido"),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  fullName: z.string().min(1, 'Este campo es requerido').optional(),
  usuario: z.string().min(1, 'Este campo es requerido').optional()
}

const { email, password, fullName, usuario } = schemas

export const formAuthSchema = z.object({
  email,
  password,
  fullName,
  usuario
});

export const formEditUserSchema = z.object({
  full_name: fullName,
  user_name: usuario
})


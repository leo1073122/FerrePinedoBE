import { z } from "zod";

export const productoSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(150, "Máximo 150 caracteres"),

  precio: z
    .number({
      invalid_type_error: "El precio debe ser un número",
    })
    .positive("El precio debe ser mayor a 0"),

  unidad_medida: z
    .string()
    .min(1, "La unidad de medida es obligatoria")
    .max(50),

  stock: z
    .number({
      invalid_type_error: "El stock debe ser un número",
    })
    .int()
    .min(0, "El stock no puede ser negativo")
    .optional(), // porque tu DB tiene default 0

  activo: z.boolean().optional(), // porque tiene default true
});

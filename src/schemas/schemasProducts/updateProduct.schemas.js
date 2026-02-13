import { z } from "zod";

export const updateProductSchema = z.object({
  nombre: z.string().min(3).optional(),
  precio: z.number().positive().optional(),
  unidad_medida: z.string().optional(),
  stock: z.number().int().optional(),
  activo: z.boolean().optional()
});

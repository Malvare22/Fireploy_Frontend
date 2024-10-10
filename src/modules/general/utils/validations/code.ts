import { z } from "zod";

export const codeSchema = z
  .string()
  .refine((d) => !isNaN(parseInt(d)) && parseInt(d) >= 0, {
    message: "El código solo puede ser un valor numérico y mayor o igual que cero",
  })

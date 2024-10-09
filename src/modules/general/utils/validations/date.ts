import { z } from "zod";

export const dateSchema = z
  .string()
  .refine((data) => new Date(data) <= new Date(), {
    message: "La fecha no es valida",
  });

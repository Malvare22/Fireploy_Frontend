import { z } from "zod";

export const lastNameSchema = z
  .string()
  .min(3, {
    message: "El apellido tener un largo mínimo de 3 caracteres",
  })
  .max(20, {
    message: "El apellido tener un largo máximo de 20 caracteres",
  });

import { z } from "zod";

export const allowedRoles = ["E", "D", "A"] as const;

export const mappedRoles: { [key in (typeof allowedRoles)[number]]: string } = {
  E: "Estudiante",
  D: "Docente",
  A: "Administrador",
};

export const rolesSchema = z.enum(allowedRoles, {
  errorMap: () => ({ message: "Selecciona una opción valida" }),
});

export type GenreSchemaType = z.infer<typeof rolesSchema>;

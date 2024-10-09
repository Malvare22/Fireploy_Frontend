import { z } from "zod";

export const allowedGenres = ["M", "F", "O"] as const;

export const mappedGenres: { [key in (typeof allowedGenres)[number]]: string } =
  {
    M: "Masculino",
    F: "Femenino",
    O: "Otro",
  };

export const genreSchema = z.enum(allowedGenres, {
  errorMap: () => ({ message: "Selecciona una opción valida" }),
});

export type GenreSchemaType = z.infer<typeof genreSchema>;

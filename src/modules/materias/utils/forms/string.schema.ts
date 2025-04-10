import { z } from "zod";

export const StandardStringSchema = z.string().max(50, "Máximo 50 caracteres para nombre.")

export const StandardStringRequiredSchema = z.string().min(1, "Campo Obligatorio").max(50, "Máximo 50 caracteres para nombre.")

export const DescriptionStringSchema = z.string().max(512, "Máximo 512 caracteres para nombre.")
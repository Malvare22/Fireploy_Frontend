import { z } from "zod";

export const UrlSchema = z.string().max(256).url("URL inválida");

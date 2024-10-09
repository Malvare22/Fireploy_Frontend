import { z } from "zod";

export const nameSchema = z.object({
    name: z.string().min(3,{
        message: 'El nombre tener un largo mínimo de 3 caracteres'
    }).max(20, {
        message: 'El nombre tener un largo máximo de 20 caracteres'
    })
});
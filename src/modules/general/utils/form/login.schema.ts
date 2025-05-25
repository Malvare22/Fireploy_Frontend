import { z } from "zod"
import { FORM_CONSTRAINS } from "../formConstrains"

export const LoginSchema = z.object({
    email: FORM_CONSTRAINS.EMAIL,
    password: z.string().min(1, 'Campo obligatorio')
})

export type LoginSchema = z.infer<typeof LoginSchema>
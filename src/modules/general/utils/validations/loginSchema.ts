import { z } from "zod";
import { passwordSchema } from "./password";

import { emailSchema } from "./email";

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})

export type LoginSchemaType = z.infer<typeof loginSchema>;

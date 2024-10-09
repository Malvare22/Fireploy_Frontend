import {z} from 'zod';
import { genreSchema } from './genre';
import { emailSchema } from './email';
import { nameSchema } from './name';
import { lastNameSchema } from './lastName';
import { dateSchema } from './date';
import { rolesSchema } from './rol';
import { codeSchema } from './code';

export const userSchema = z.object({
   
    name: nameSchema,
    lastName: lastNameSchema,
    email: emailSchema,
    rol: rolesSchema,
    code: codeSchema,
    date: dateSchema,
    genre: genreSchema,
    img: z.string()
    
});
//merge(passwordChangeSchema).merge(emailSchema).merge(genreSchema)


export const UserNotification = ['Error al registrar al usuario', 'Usuario registrado con éxito'];

export type UserSchemaType = z.infer<typeof userSchema>;
import {z} from 'zod';
import { genreSchema } from './genre';
import { passwordChangeSchema } from './password';
import { emailSchema } from './email';
import { nameSchema } from './name';
import { lastNameSchema } from './lastName';
import { dateSchema } from './date';

export const registerSchema = z.object({}).merge(emailSchema).merge(genreSchema).merge(passwordChangeSchema).merge(nameSchema).merge(lastNameSchema).merge(dateSchema);
// , passwordChangeSchema, emailSchema, genreSchema
//merge(passwordChangeSchema).merge(emailSchema).merge(genreSchema)


export const RegisterNotification = ['Error al registrar al usuario', 'Usuario registrado con éxito'];

export type RegisterSchemaType = z.infer<typeof registerSchema>;
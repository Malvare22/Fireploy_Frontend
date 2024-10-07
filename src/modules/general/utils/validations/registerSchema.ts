import {z} from 'zod';
import { allowedGenres, genreSchema } from './genre';
import { passwordChangeSchema } from './password';
import { emailSchema } from './email';

export const registerSchema = z.object({
    name: z.string().min(3,{
        message: 'El nombre tener un largo mínimo de 3 caracteres'
    }).max(20, {
        message: 'El nombre tener un largo máximo de 20 caracteres'
    }),

    lastName: z.string().min(3,{
        message: 'El apellido tener un largo mínimo de 3 caracteres'
    }).max(20, {
        message: 'El apellido tener un largo máximo de 20 caracteres'
    }),

    date: z.string().refine(
        (data) => new Date(data) <= new Date(),
        {
            message: 'La fecha no es valida'
        }
    ),

    
}).merge(emailSchema).merge(genreSchema).merge(passwordChangeSchema)
// , passwordChangeSchema, emailSchema, genreSchema
//merge(passwordChangeSchema).merge(emailSchema).merge(genreSchema)


export const RegisterNotification = ['Error al registrar al usuario', 'Usuario registrado con éxito'];

export type RegisterSchemaType = z.infer<typeof registerSchema>;
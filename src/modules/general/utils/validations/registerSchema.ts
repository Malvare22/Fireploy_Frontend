import {z} from 'zod';
import { passwordConfirmMessage, passwordRequirements, passwordValidation } from './password';
import { allowedGenres } from './genre';

export const registerSchema = z.object(
    {
        name: z.string().min(3,{
            message: 'El nombre tener un largo mínimo de 3 caracteres'
        }).max(20, {
            message: 'El nombre tener un largo máximo de 20 caracteres'
        }),

        email: z.string().email({
            message: 'No tiene el formato adecuado de un correo electrónico'
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

        password: z.string().refine(
            (data) => passwordValidation(data),
            {
                message: passwordRequirements
            } 
        ),

        passwordConfirm: z.string(),

        genre: z.enum(allowedGenres, {
            errorMap: () => ({message: 'Selecciona una opción valida'}),
        }),
    }
).refine((data) => 
    (data.password == data.passwordConfirm),{
            message: passwordConfirmMessage,
            path: ['passwordConfirm'], // Indica que el error está relacionado con el campo passwordConfirm
    }
);

export const RegisterNotification = ['Error al registrar al usuario', 'Usuario registrado con éxito'];

export type RegisterSchemaType = z.infer<typeof registerSchema>;
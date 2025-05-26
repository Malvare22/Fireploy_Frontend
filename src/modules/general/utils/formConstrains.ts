import { z } from "zod";
export const FORM_CONSTRAINS = {
  TEXT_LABEL: z.string().min(1, "Campo obligatorio"),
  LINK_LENGTH: z.string().max(256, "La longitud máxima permitida es de 256 caracteres"),
  TEXT_DESCRIPTION: z.string().max(512, "La longitud máxima permitida es de 512 caracteres"),
  DATE: z.string().date("Se requiere una fecha formal en YYYY/MM/DD"),
  DATE_NO_MINOR:  z.string().date("Se requiere una fecha formal en YYYY/MM/DD").refine((date) => {
    const today = new Date().getTime();
    const myDate = new Date(date).getTime();
    if(today < myDate) return false;
    return true;
  }, 'Se requiere que la fecha sea menor o igual a la fecha actual'),
  ID: z.number().min(0, "Ingrese un valor númerico positivo"),
  EMAIL: z.string().min(0, 'Campo requerido').email('Ingrese una dirección de correo electronica válida'),
  URL: z.string().max(256).url("URL inválida"),
  PASSWORD: z.string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula.",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula.",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número.",
    })
    .regex(/[@$!%*?&#]/, {
      message: "La contraseña debe contener al menos un carácter especial (@$!%*?&#).",
    })
} as const;



import { z } from "zod";

/**
 * Atributo Zod para la validación de fechas en registros
 */
export const fechaSchema =  z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "La fecha debe tener el formato AAAA-MM-DD.",
      })
      .refine(
        (fecha) => {
          const _fecha = new Date(fecha);
          return !isNaN(_fecha.getTime());
        },
        { message: "La fecha debe ser una fecha válida." }
      );

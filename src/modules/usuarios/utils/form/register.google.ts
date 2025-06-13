import { z } from "zod";
import {
  sexoUsuarioSchema,
  tiposUsuarioSchema,
  UserDatesSchema,
} from "./usuario.schema";
import { FORM_CONSTRAINS } from "@modules/general/utils/formConstrains";

export const RegistroGoogleSchema = z
  .object({
    id: FORM_CONSTRAINS.ID.optional(),
    sexo: sexoUsuarioSchema,
    tipo: tiposUsuarioSchema,
  })
  .merge(UserDatesSchema)
  .refine(
    (object) => {
      const { estFechaInicio, fechaDeNacimiento } = object;
      const yearBirth = new Date(fechaDeNacimiento).getFullYear();
      const yearEntryDate = new Date(estFechaInicio).getFullYear();
      return yearEntryDate - yearBirth >= 16;
    },
    {
      message:
        "Las fechas son inverosímiles para el sistema (ver documentación)",
      path: ["estFechaInicio"],
    }
  );

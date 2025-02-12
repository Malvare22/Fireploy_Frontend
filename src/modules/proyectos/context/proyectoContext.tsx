import { createContext } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { EdicionProyectoSchema } from "../utils/zod/proyecto.edicion.schema";

export const ProyectoContext = createContext<
  | undefined
  | {
      register: UseFormRegister<EdicionProyectoSchema>;
      proyecto: EdicionProyectoSchema | undefined;
      errors: FieldErrors<EdicionProyectoSchema>;
      watch: UseFormWatch<EdicionProyectoSchema>;
      setValue: UseFormSetValue<EdicionProyectoSchema>
    }
>(undefined);

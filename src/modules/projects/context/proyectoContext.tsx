import { TypeProyecto } from "@modules/general/utils/data/proyectos";
import { createContext } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

export const ProyectoContext = createContext<
  | undefined
  | {
      register: UseFormRegister<TypeProyecto>;
      proyecto: TypeProyecto | undefined;
      errors: FieldErrors<TypeProyecto>;
      watch: UseFormWatch<TypeProyecto>;
    }
>(undefined);

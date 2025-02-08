import { createContext } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Proyecto } from "../types/proyecto";

export const ProyectoContext = createContext<
  | undefined
  | {
      register: UseFormRegister<Proyecto>;
      proyecto: Proyecto | undefined;
      errors: FieldErrors<Proyecto>;
      watch: UseFormWatch<Proyecto>;
      setValue: UseFormSetValue<Proyecto>
    }
>(undefined);

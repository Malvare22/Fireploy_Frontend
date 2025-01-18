import React, { createContext } from "react";
import { TypeProyecto } from "../utils/type/typeProyecto";

export const ProyectoContext = createContext<
  | undefined
  | {
      buffer: TypeProyecto | undefined,
      setBuffer: React.Dispatch<TypeProyecto | undefined>,
      proyecto: TypeProyecto | undefined
    }
>(undefined);

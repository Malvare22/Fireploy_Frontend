import React, { createContext } from "react";
import { TypeProyecto } from "../utils/type/typeProyecto";

export const ProyectoContext = createContext<
  | undefined
  | {
      proyecto: TypeProyecto | undefined;
      buffer: TypeProyecto | undefined;
      setBuffer: React.Dispatch<undefined | TypeProyecto>;
    }
>(undefined);

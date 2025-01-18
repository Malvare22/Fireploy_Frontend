import React, { createContext } from "react";
import { TypeProyecto } from "../utils/type/typeProyecto";

export const ProyectoContext = createContext<
  | undefined
  | {
      test: string,
      setTest: React.Dispatch<string>
    }
>(undefined);

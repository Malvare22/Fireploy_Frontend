import { createContext } from "react";
import { TypeProyecto } from "../utils/type/typeProyecto";

export const ProyectoContext = createContext<undefined | TypeProyecto>(undefined);
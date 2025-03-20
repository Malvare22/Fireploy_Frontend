import { useTheme } from "@mui/material";
import { EstadoEjecucionProyecto } from "../types/proyecto.tipo";

export const getExecutionState: Record<EstadoEjecucionProyecto, string> = {
  F: "Offline",
  N: "Online",
  E: "Error",
  L: "Loading",
};

export const getColorExecutionState = (state: EstadoEjecucionProyecto) => {
  const theme = useTheme();
  switch (state) {
    case "E":
      return theme.palette.error.main;
    case "N":
      return theme.palette.success.main;
    case "L":
      return theme.palette.grey;
    case "F":
      return theme.palette.warning.main;
  }
};

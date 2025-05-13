import { useTheme } from "@mui/material";
import { EstadoEjecucionProyecto } from "../types/proyecto.tipo";

/**
 * getExecutionState – A record that maps each execution state of a project to a human-readable string.
 * 
 * The states represent the current status of a project's execution:
 * - "F" -> "Offline"
 * - "N" -> "Online"
 * - "E" -> "Error"
 * - "L" -> "Loading"
 */
export const getExecutionState: Record<EstadoEjecucionProyecto, string> = {
  F: "Offline",
  N: "Online",
  E: "Error",
  L: "Loading",
};

/**
 * getColorExecutionState – A function that returns the color associated with a specific execution state.
 * 
 * The function uses the theme's color palette to return a color based on the state:
 * - "E" -> Error (red color)
 * - "N" -> Online (green color)
 * - "L" -> Loading (grey color)
 * - "F" -> Offline (yellow color)
 * 
 * @param {EstadoEjecucionProyecto} state - The execution state for which the color is required.
 * @returns {string} The color corresponding to the execution state.
 */
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

/**
 * getExecutionStateArray – Converts the `getExecutionState` record into an array of tuples,
 * where each tuple associates an execution state with its human-readable string.
 * 
 * @returns {Array<[EstadoEjecucionProyecto, string]>} An array of tuples representing the execution states.
 * 
 * Example:
 * ```ts
 * [["F", "Offline"], ["N", "Online"], ["E", "Error"], ["L", "Loading"]]
 * ```
 */
export const getExecutionStateArray = Object.entries(getExecutionState) as [
  EstadoEjecucionProyecto,
  string
][];
import { useTheme } from "@mui/material";
import { BaseDeDatos } from "../types/baseDeDatos";
import { getImage } from "@modules/general/utils/getImage";

/**
 * getDataBaseTypesMap – A Map that associates each database type with a human-readable string.
 * 
 * Types:
 * - "S" -> "SQL"
 * - "N" -> "MongoDB"
 * - "E" -> "No Seleccionado"
 */
export const getDataBaseTypesMap: Map<BaseDeDatos["tipo"], string> = new Map([
  ["S", "SQL"],
  ["N", "MongoDB"],
  ["E", "Sin base de datos"],
]);

/**
 * getDataBaseTypesArray – An array of tuples where each tuple associates a database type with its human-readable string.
 * 
 * Types:
 * - "S" -> "SQL"
 * - "N" -> "MongoDB"
 * - "E" -> "No Seleccionado"
 */
export const getDataBaseTypesArray: [BaseDeDatos["tipo"], string][] = [
  ["S", "SQL"],
  ["N", "MongoDB"],
  ["E", "Sin base de datos"],
];

/**
 * getDataBaseTypeColor – A function that returns a Map associating each database type with a corresponding color from the MUI theme.
 * 
 * - "S" -> warning color
 * - "N" -> success color
 * - "E" -> info color
 * 
 * @returns {Map<BaseDeDatos["tipo"], string>} A Map containing the color for each database type.
 */
export const getDataBaseTypeColor = () => {
  const theme = useTheme();

  return new Map<BaseDeDatos["tipo"], string>([
    ["S", theme.palette.warning.light],
    ["N", theme.palette.success.light],
    ["E", theme.palette.info.light],
  ]);
};

/**
 * getDataBaseTypeImage – A Map that associates each database type with a specific image URL.
 * 
 * - "S" -> MySQL image
 * - "N" -> MongoDB image
 * - "E" -> "No Seleccionado"
 */
export const getDataBaseTypeImage: Map<BaseDeDatos["tipo"], string> = new Map([
  ["S", getImage["mysql"].ruta],
  ["N", getImage["mongodb"].ruta],
  ["E", "No Seleccionado"],
]);

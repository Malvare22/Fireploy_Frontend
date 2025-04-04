import { useTheme } from "@mui/material";
import { BaseDeDatos } from "../types/baseDeDatos";
import { getImage } from "@modules/general/utils/getImage";

export const getDataBaseTypesMap: Map<BaseDeDatos["tipo"], string> = new Map([
  ["S", "SQL"],
  ["N", "MongoDB"],
  ["E", "No Seleccionado"],
]);

export const getDataBaseTypesArray: [BaseDeDatos["tipo"], string][] = [
  ["S", "SQL"],
  ["N", "MongoDB"],
  ["E", "No Seleccionado"],
];

export const getDataBaseTypeColor = () => {
  const theme = useTheme();

  return new Map<BaseDeDatos["tipo"], string>([
    ["S", theme.palette.warning.light],
    ["N", theme.palette.success.light],
    ["E", theme.palette.info.light],
  ]);
};

export const getDataBaseTypeImage: Map<BaseDeDatos["tipo"], string> = new Map([
  ["S", getImage["mysql"].ruta],
  ["N", getImage["mongodb"].ruta],
  ["E", "No Seleccionado"],
]);

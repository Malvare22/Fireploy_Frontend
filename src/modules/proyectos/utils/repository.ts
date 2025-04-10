import { useTheme } from "@mui/material";
import { Repositorio } from "../types/repositorio";

export const getRepositoryTypesMap: Map<Repositorio["tipo"], string> = new Map([
  ["B", "Backend"],
  ["F", "Frontend"],
  ["I", "Monolito"],
]);

export const getRepositoryTypesArray: [Repositorio["tipo"], string][] = [
  ["B", "Backend"],
  ["F", "Frontend"],
  ["I", "Monolito"],
];

export const getRepositoryTypeColor = () => {
  const theme = useTheme();

  return new Map<Repositorio["tipo"], string>([
    ["B", theme.palette.error.light],
    ["F", theme.palette.info.light],
    ["I", theme.palette.success.light],
  ]);
};
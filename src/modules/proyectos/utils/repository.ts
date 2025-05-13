import { useTheme } from "@mui/material";
import { Repositorio } from "../types/repositorio";

/**
 * getRepositoryTypesMap – A map that associates each repository type with a human-readable string.
 * 
 * The repository types are:
 * - "B" -> "Backend"
 * - "F" -> "Frontend"
 * - "I" -> "Monolito" (Monolithic)
 * 
 * @returns {Map<Repositorio["tipo"], string>} A Map where each key is a repository type and the value is the corresponding human-readable string.
 */
export const getRepositoryTypesMap: Map<Repositorio["tipo"], string> = new Map([
  ["B", "Backend"],
  ["F", "Frontend"],
  ["I", "Monolito"],
]);

/**
 * getRepositoryTypesArray – An array that represents the repository types and their human-readable names.
 * 
 * This array contains tuples where each tuple consists of:
 * - A repository type key ("B", "F", or "I")
 * - The human-readable name of the type ("Backend", "Frontend", or "Monolito")
 * 
 * @returns {[Repositorio["tipo"], string][]} An array of tuples representing repository types and their names.
 */
export const getRepositoryTypesArray: [Repositorio["tipo"], string][] = [
  ["B", "Backend"],
  ["F", "Frontend"],
  ["I", "Monolito"],
];

/**
 * getRepositoryTypeColor – A function that returns a Map of colors associated with repository types.
 * 
 * The color map is based on the Material-UI theme, and each repository type is associated with a specific color:
 * - "B" (Backend) -> error light color
 * - "F" (Frontend) -> info light color
 * - "I" (Monolito) -> success light color
 * 
 * @returns {Map<Repositorio["tipo"], string>} A Map where each repository type is associated with a specific color.
 */
export const getRepositoryTypeColor = () => {
  const theme = useTheme();

  return new Map<Repositorio["tipo"], string>([
    ["B", theme.palette.error.light],
    ["F", theme.palette.info.light],
    ["I", theme.palette.success.light],
  ]);
};
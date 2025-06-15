import { Alert, Chip, Stack } from "@mui/material";

type Props = {
  backend?: string;
  frontend?: string;
  dataBase?: string;
  integrado?: string;
};

/**
 * TechnologyTags component – displays technology stack information as color-coded chips
 * for a given project, including frontend, backend, integrated systems, and database.
 *
 * If no technologies are provided, an alert message is shown instead.
 *
 * @component
 *
 * @param backend - Name of the backend technology used in the project (e.g., Node.js, Java).
 * @param frontend - Name of the frontend technology used in the project (e.g., React, Angular).
 * @param dataBase - Name of the database technology used (e.g., PostgreSQL, MongoDB).
 * @param integrado - Name of the integrated system or full-stack framework used (e.g., Next.js).
 *
 * @returns A stack of Material UI chips representing technologies, or an alert if none are provided.
 *
 * @example
 * ```tsx
 * <TechnologyTags
 *   backend="Node.js"
 *   frontend="React"
 *   dataBase="MongoDB"
 *   integrado="Next.js"
 * />
 * ```
 */
export function TechnologyTags({ backend, dataBase, frontend, integrado }: Props) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} useFlexGap flexWrap="wrap">
      {backend && <Chip label={backend} size="medium" color="error" />}
      {frontend && <Chip label={frontend} color="primary" />}
      {dataBase && <Chip label={integrado} size="medium" color="primary" />}
      {dataBase && <Chip label={dataBase} size="medium" color="info" />}
      {!dataBase && !frontend && !backend && !integrado && (
        <Alert severity="warning">
          Este proyecto actualmente no cuenta con tecnologías vinculadas
        </Alert>
      )}
    </Stack>
  );
}

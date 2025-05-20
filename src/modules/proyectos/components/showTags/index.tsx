import { Alert, Chip, Stack } from "@mui/material";

type Props = {
  backend?: string;
  frontend?: string;
  dataBase?: string;
  integrado?: string;
};

export function TechnologyTags({ backend, dataBase, frontend, integrado }: Props) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} useFlexGap flexWrap="wrap">
      {backend && <Chip label={backend} color="error" />}
      {frontend && <Chip label={frontend} color="primary" />}
      {dataBase && <Chip label={integrado} color="primary" />}
      {dataBase && <Chip label={dataBase} color="info" />}
      {!dataBase && !frontend && !backend && !integrado && (
        <Alert severity="warning">
          Este proyecto actualmente no cuenta con tecnologías vinculadas
        </Alert>
      )}
    </Stack>
  );
}

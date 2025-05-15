import { Alert, Chip, Stack } from "@mui/material";

type Props = {
  backend?: string;
  frontend?: string;
  dataBase?: string;
};

export function TechnologyTags({ backend, dataBase, frontend }: Props) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} useFlexGap flexWrap="wrap">
      {backend && <Chip label={backend} color="error" />}
      {frontend && <Chip label={frontend} color="primary" />}
      {dataBase && <Chip label={dataBase} color="info" />}
      {!dataBase && !frontend && !backend && (
        <Alert severity="warning">
          Este proyecto actualmente no cuenta con tecnologías vinculadas
        </Alert>
      )}
    </Stack>
  );
}

import { KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import TablaGestionarFicheros from "@modules/proyectos/components/gestorDeFicheros";
import { openInNewTab } from "@modules/general/utils/openTab";
import { REFERENCE_TO_DOC } from "@modules/general/enums/referencesToDoc";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type ExtraFilesProps = {
  isDisabled: boolean;
  layer: KeysOfRepository;
};

function ExtraFiles({ isDisabled, layer }: ExtraFilesProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">{"Archivos de Configuración"}</Typography>
      <Divider />
      <Typography variant="body2">
        {
          " Los archivos de configuración, como los .env, no se deben guardar en elrepositorio porque suelen contener credenciales, claves privadas y configuraciones sensibles que varían entre entornos (desarrollo, pruebas, producción). Guardarlos en el código fuente expone información confidencial y dificulta la portabilidad del proyecto. En su lugar, se recomienda mantener un archivo de ejemplo (.env.example) con las variables necesarias sin valores sensibles."
        }
      </Typography>
      <TransitionAlert />
      <TablaGestionarFicheros field={layer} disabled={isDisabled} />
    </Stack>
  );
}

export default ExtraFiles;

function TransitionAlert() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>{"Restricciones de variables de entorno"}</AlertTitle>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <>
              {
                "Ten en cuenta que Fireploy usa una serie de variables de entorno especiales, las cuales cumplen fines específicos y no deben volverse a declarar"
              }
            </>
            <Button
              variant="outlined"
              size="small"
              onClick={() => openInNewTab(REFERENCE_TO_DOC.SPECIAL_VARIABLES)}
            >
              {"Ver más detalles"}
            </Button>
          </Stack>
        </Alert>
      </Collapse>
    </Box>
  );
}

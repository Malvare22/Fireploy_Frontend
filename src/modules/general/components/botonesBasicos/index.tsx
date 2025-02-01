import { LabelGeneral } from "@modules/general/enums/labelGeneral";
import { Box, Button } from "@mui/material";

const BotonesBasicos: React.FC<{
  aceptar?: () => void;
  cancelar: () => void;
}> = ({ aceptar, cancelar }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
      <Button variant="contained" color="warning" type="submit" onClick={aceptar && aceptar}>
        {LabelGeneral.guardar}
      </Button>
      <Button variant="contained" color="inherit" onClick={cancelar}>
        {LabelGeneral.cancelar}
      </Button>
    </Box>
  );
};

export default BotonesBasicos;

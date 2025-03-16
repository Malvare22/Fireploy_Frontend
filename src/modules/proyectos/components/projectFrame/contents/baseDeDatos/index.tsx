import CustomSelect from "@modules/general/components/customSelect";
import { ProyectoContext } from "@modules/proyectos/context/proyectoContext";
import { LabelDatabase } from "@modules/proyectos/enum/labelDatabase";
import { obtenerTipoBaseDatos } from "@modules/proyectos/utils/baseDeDatos.map";
import { Box, Button, Divider, MenuItem, Typography } from "@mui/material";
import { useContext } from "react";

function Database() {
  const context = useContext(ProyectoContext);

  if (!context) return <></>;

  const { register, watch } = context;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h3Bold">{LabelDatabase.titulo}</Typography>

        <Divider />
      </Box>
      <Box>
        <Typography variant="title">{LabelDatabase.parrafo}</Typography>
      </Box>
      <Box
        sx={{
          border: "solid 1px rgba(0,0,0, .2)",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          paddingY: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", marginTop: -2 }}>
          <Typography
            variant="title2Bold"
            sx={{ display: "inline", marginRight: 2 }}
          >
            {LabelDatabase.tipo}
          </Typography>
          <Box sx={{ width: "80%" }}>
            <CustomSelect
              variantDelta="secondary"
              value={watch("baseDeDatos.tipo")}
              {...register("baseDeDatos.tipo")}
            >
              {Array.from(obtenerTipoBaseDatos).map(([clave, valor]) => (
                <MenuItem key={clave} value={clave}>
                  {valor}
                </MenuItem>
              ))}
            </CustomSelect>
          </Box>
        </Box>
        <Box sx={{
          display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, gap: 2, alignItems: {sm: 'center'}
        }}>
          <Box>
            <Typography variant="title2Bold">
              {LabelDatabase.gestionar}
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" color="warning">
              Gestionar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Database;

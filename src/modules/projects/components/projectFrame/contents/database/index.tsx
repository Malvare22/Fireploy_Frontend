import CustomSelect from "@modules/general/components/customSelect";
import { ProyectoContext } from "@modules/projects/context/proyectoContext";
import { LabelDatabase } from "@modules/projects/enum/labelDatabase";
import { tecnologiasDummy } from "@modules/projects/utils/data/tecnologias";
import { Box, Button, Divider, MenuItem, Typography } from "@mui/material";
import { useContext, useState } from "react";

function Database() {
  const proyecto = useContext(ProyectoContext);

  const [baseDatosId, setBaseDatosId] = useState<undefined | number>(
    proyecto?.baseDeDatos.id
  );

  if (!proyecto) return <></>;

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
              value={baseDatosId}
              onChange={(e) => setBaseDatosId(e.target.value as number)}
            >
              {tecnologiasDummy.map(
                (baseDeDatos) =>
                  baseDeDatos.type == "database" && (
                    <MenuItem key={baseDeDatos.id} value={baseDeDatos.id}>
                      {baseDeDatos.text}
                    </MenuItem>
                  )
              )}
            </CustomSelect>
          </Box>
        </Box>
        <Box>
          <Typography
            variant="title2Bold"
            sx={{ display: "inline", marginRight: 2 }}
          >
            {LabelDatabase.gestionar}
          </Typography>
          <Button variant="contained" color="warning">
            Gestionar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Database;

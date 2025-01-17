import CustomSelect from "@modules/general/components/customSelect";
import { LabelDatabase } from "@modules/projects/enum/labelDatabase";
import { basesDeDatosDummies } from "@modules/projects/utils/data/database";
import { Box, Divider, MenuItem, Typography } from "@mui/material";

function Database() {
  return (
    <Box sx={{ border: "1px solid black" }}>
      <Typography variant="h3Bold">{LabelDatabase.titulo}</Typography>

      <Divider sx={{ marginBottom: 3 }} />
      <Box>
        <Typography variant="title">{LabelDatabase.parrafo}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
        <Typography variant="title2Bold" sx={{ display: "inline" }}>
          {LabelDatabase.tipo}
        </Typography>
        <Box sx={{width: '80%'}}>
          <CustomSelect variantDelta="secondary" sx={{ marginY: 3 }}>
            {basesDeDatosDummies.map((baseDeDatos) => (
              <MenuItem key={baseDeDatos.id} value={baseDeDatos.id}>
                {baseDeDatos.text}
              </MenuItem>
            ))}
          </CustomSelect>
        </Box>
      </Box>
    </Box>
  );
}

export default Database;

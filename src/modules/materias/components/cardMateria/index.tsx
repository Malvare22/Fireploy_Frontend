import AnimatedCard from "@modules/general/components/animatedCard";
import { labelCardMateria } from "@modules/materias/enums/labelCardMateria";
import { Materia } from "@modules/materias/types/materia";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import StyleIcon from "@mui/icons-material/Style";
import { useNavigate } from "react-router-dom";
import { rutasMaterias } from "@modules/materias/router/router";

type CardMateriaProps = {
  materia: Materia;
};

const CardMateria: React.FC<CardMateriaProps> = ({ materia }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <AnimatedCard>
      <Stack justifyContent={"space-between"} sx={{ padding: 3 }} spacing={3}>
        <Typography variant="h4" fontWeight={"500"}>
          {materia.nombre}
        </Typography>
        <Box>
          <Typography
            padding={1}
            fontWeight={"500"}
            display={"inline-block"}
            sx={{
              backgroundColor: theme.palette.warning.main,
              color: "white",
              borderRadius: 1,
            }}
          >{`${materia.semestre} semestre`}</Typography>
        </Box>
        <Stack alignItems={"end"}>
          <Button
            endIcon={<StyleIcon />}
            onClick={() =>
              navigate(
                rutasMaterias.verCursos.replace(":id", materia.id.toString())
              )
            }
          >
            {labelCardMateria.verGrupos}
          </Button>
        </Stack>
      </Stack>
    </AnimatedCard>
  );
};

export default CardMateria;

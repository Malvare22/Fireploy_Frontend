import AnimatedCard from "@modules/general/components/animatedCard";
import { labelCardMateria } from "@modules/materias/enums/labelCardMateria";
import { Materia } from "@modules/materias/types/materia";
import { Box, Button, Card, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import StyleIcon from "@mui/icons-material/Style";

type CardMateriaProps = {
  materia: Materia;
};

const CardMateria: React.FC<CardMateriaProps> = ({ materia }) => {

    const theme = useTheme();

  return (
    <AnimatedCard >
      <Stack justifyContent={'space-between'} sx={{ padding: 3 }} spacing={3}>
        <Typography variant="h4" fontWeight={"500"} sx={{
            height: 80
    }}>
          {materia.nombre}
        </Typography>
        <Typography sx={{    overflow: "hidden", 
    textOverflow: "ellipsis", height: 94}}>{materia.descripcion}</Typography>
          <Typography
            padding={1}
            fontWeight={"500"}
            display={"inline-block"}
            sx={{backgroundColor: theme.palette.warning.main, color: 'white', width: 130, borderRadius: 1}}
          >{`${materia.semestre} semestre`}</Typography>
        <Stack alignItems={'end'}><Button endIcon={<StyleIcon />}>{labelCardMateria.verGrupos}</Button></Stack>
      </Stack>
    </AnimatedCard>
  );
};

export default CardMateria;

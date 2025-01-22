import CustomInput from "@modules/general/components/customInput";
import CustomSelect from "@modules/general/components/customSelect";
import CustomTextArea from "@modules/general/components/customTextArea";
import { materiasDummy } from "@modules/general/utils/data/materias";
import { ProyectoContext } from "@modules/projects/context/proyectoContext";
import { Box, Divider, MenuItem, SxProps, Typography } from "@mui/material";
import { useContext, useMemo } from "react";

function Adicionales() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h3Bold">Otros Aspectos</Typography>
        <Divider />
      </Box>
      <Content />
    </Box>
  );
}

const columnSx = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  gap: 2,
  alignContent: { sm: "center" },
} as SxProps;

const labelSx = {
  minWidth: 160,
  maxWidth: 160,
  display: "flex",
  alignItems: "center",
} as SxProps;

const Content = () => {
  const context = useContext(ProyectoContext);

  if (!context) return <></>;

  const { proyecto, register, errors, watch } = context;

  const allMaterias = () => {
    return materiasDummy;
  };

  const currentMateria = watch("materia");

  const getMateria = materiasDummy.find(
    (materia) => materia.id == watch("materia")
  );

  const getGrupos = useMemo(() => {
    if (getMateria != undefined) {
      return getMateria.grupos;
    }

    return [];
  }, [currentMateria]);

  const currentGrupo = watch("grupo");

  const getSecciones = useMemo(() => {
    return getGrupos?.find((grupo) => grupo.id == currentGrupo)?.secciones;
  }, [currentGrupo]);

  if (!proyecto) return <></>;

  return (
    <Box
      sx={{
        border: "solid 1px rgba(0,0,0, .2)",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        paddingBottom: 5,
      }}
    >
      <Box sx={columnSx}>
        <Box sx={labelSx}>
          <Typography variant="titleBold">Título</Typography>
        </Box>
        <CustomInput
          variant="secondary"
          {...register("titulo")}
          errorMessage={errors.titulo?.message}
        />
      </Box>

      <Box sx={columnSx}>
        <Box sx={labelSx}>
          <Typography variant="titleBold">Descripción</Typography>
        </Box>
        <CustomTextArea
          {...register("descripcion")}
          errorMessage={errors.descripcion?.message}
        />
      </Box>

      <Box sx={columnSx}>
        <Box sx={columnSx}>
          <Box sx={labelSx}>
            <Typography variant="titleBold">Materia</Typography>
          </Box>
          <CustomSelect
            variantDelta="secondary"
            {...register("materia")}
            errorMessage={errors.materia?.message}
            value={watch("materia")}
          >
            {allMaterias().map((materia, key) => (
              <MenuItem value={materia.id} key={key}>
                {materia.nombre}
              </MenuItem>
            ))}
          </CustomSelect>
        </Box>

        <Box sx={columnSx}>
          <Box sx={labelSx}>
            <Typography variant="titleBold">Grupo</Typography>
          </Box>
          <CustomSelect
            variantDelta="secondary"
            {...register("grupo")}
            errorMessage={errors.grupo?.message}
            value={watch("grupo")}
          >
            {getGrupos &&
              getGrupos.map((grupo, key) => (
                <MenuItem value={grupo.id} key={key}>
                  {grupo.id}
                </MenuItem>
              ))}
          </CustomSelect>
        </Box>

        <Box sx={columnSx}>
          <Box sx={labelSx}>
            <Typography variant="titleBold">Sección</Typography>
          </Box>
          <CustomSelect
            variantDelta="secondary"
            {...register("seccion")}
            errorMessage={errors.seccion?.message}
            value={watch("seccion")}
          >
            {getSecciones &&
              getSecciones.map((seccion, key) => (
                <MenuItem value={seccion.id} key={key}>
                  {seccion.titulo}
                </MenuItem>
              ))}
          </CustomSelect>
        </Box>
      </Box>
    </Box>
  );
};

export default Adicionales;

import CustomInput from "@modules/general/components/customInput";
import CustomSelect from "@modules/general/components/customSelect";
import CustomTextArea from "@modules/general/components/customTextArea";
import PreviewImage from "@modules/general/components/previewImage";
import { usePreviewImage } from "@modules/general/components/previewImage/hooks";

import { ProyectoContext } from "@modules/proyectos/context/proyectoContext";
import { Box, Divider, MenuItem, SxProps, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo } from "react";

const Adicionales = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h3Bold">Otros Aspectos</Typography>
        <Divider />
      </Box>
      <Content />
    </Box>
  );
};

const columnSx = {
  display: "flex",
  flexDirection: { xs: "column", xl: "row" },
  gap: 2,
  alignContent: { md: "center" },
} as SxProps;

const labelSx = {
  display: "flex",
  alignItems: "center",
} as SxProps;

const Content = () => {
  const context = useContext(ProyectoContext);

  if (!context) return <></>;

  const { proyecto, register, errors, watch, setValue } = context;

  const { image, setImage } = usePreviewImage(watch("imagen"));

  useEffect(() => {
    setValue("imagen", image, { shouldDirty: true });
  }, [image]);

  const handleImage = () => {};

  const allMaterias = () => {
    return [];
  };

  const currentMateria = watch("materiaInformacion.materia");

  const getMateria = allMaterias().find(
    (materia) => materia.id == watch("materiaInformacion.materia")
  );

  const getGrupos = useMemo(() => {
    if (getMateria != undefined) {
      return getMateria.cursos;
    }

    return [];
  }, [currentMateria]);

  const currentGrupo = watch("materiaInformacion.curso");

  const getSecciones = useMemo(() => {
    if (getGrupos == undefined) {
      return [];
    }
    return getGrupos?.find((grupo) => grupo.id == currentGrupo)?.secciones;
  }, [currentMateria, currentGrupo]);

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
          <Typography variant="titleBold">Imagen</Typography>
        </Box>
        <PreviewImage image={watch("imagen") || ""} setImage={setImage} type="proyecto"/>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
            {...register("materiaInformacion.materia")}
            errorMessage={errors.materiaInformacion?.materia?.message}
            value={watch("materiaInformacion.materia")}
            sx={{
              width: { xl: 200 },
            }}
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
            {...register("materiaInformacion.curso")}
            errorMessage={errors.materiaInformacion?.curso?.message}
            value={watch("materiaInformacion.curso")}
            sx={{
              width: { xl: 70 },
            }}
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
            {...register("materiaInformacion.seccion")}
            errorMessage={errors.materiaInformacion?.seccion?.message}
            value={watch("materiaInformacion.seccion")}
            sx={{
              width: { xl: 300 },
            }}
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

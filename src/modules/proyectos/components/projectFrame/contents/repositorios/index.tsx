import CustomInput from "@modules/general/components/customInput";
import CustomSelect from "@modules/general/components/customSelect";
import { ProyectoContext } from "@modules/proyectos/context/proyectoContext";
import { repositorioBase } from "@modules/proyectos/test/data/repositorioBase";
import { Proyecto } from "@modules/proyectos/types/proyecto";
import { RepositorioProyecto } from "@modules/proyectos/types/proyecto.repositorio";
import { TecnologiaRepositorio } from "@modules/proyectos/types/repositorio.tecnologia";
import { obtenerTipoDeRepositorio } from "@modules/proyectos/utils/obtenerTipoDeRepositorio";
import {
  obtenerOpcionesSelectTecnologia,
} from "@modules/proyectos/utils/separarTecnologias";
import { Box, Divider, MenuItem, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

function Repositorios() {
  const context = useContext(ProyectoContext);

  if (!(context && context.proyecto)) {
    return <></>;
  }

  const { errors, register, watch, setValue, proyecto } = context;

  useEffect(() => {
    if (watch("numeroDeCapas") == proyecto.numeroDeCapas) {
      setValue("repositorios", proyecto.repositorios);
    } else {
      let capas: RepositorioProyecto[] = [];
      if (watch("numeroDeCapas") == 1) {
        capas.push(repositorioBase("I") as RepositorioProyecto);
      } else {
        capas.push(repositorioBase("B") as RepositorioProyecto);
        capas.push(repositorioBase("F") as RepositorioProyecto);
      }
      setValue("repositorios", capas);
    }
  }, [watch("numeroDeCapas")]);

  return (
    <Box>
      <Typography variant="h3Bold">Repositorios</Typography>
      <Divider />
      <Box sx={{ display: "flex", marginY: 3 }}>
        <Typography variant="titleBold">Número de repositorios</Typography>
        <CustomSelect
          variantDelta="secondary"
          {...register("numeroDeCapas")}
          errorMessage={errors.numeroDeCapas?.message}
          value={watch("numeroDeCapas")}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
        </CustomSelect>
      </Box>
      {watch("numeroDeCapas") == 1 ? (
        <RepositoryForm
          type="I"
          errors={errors}
          register={register}
          watch={watch}
          index={0}
          setValue={setValue}
        />
      ) : (
        <>
          {
            <RepositoryForm
              type="B"
              errors={errors}
              register={register}
              watch={watch}
              setValue={setValue}
              index={0}
            />
          }
          <RepositoryForm
            type="F"
            errors={errors}
            register={register}
            watch={watch}
            index={1}
            setValue={setValue}
          />
        </>
      )}
    </Box>
  );
}

interface RepositoryFormProps {
  type: TecnologiaRepositorio["tipo"];
  errors: FieldErrors<Proyecto>;
  register: UseFormRegister<Proyecto>;
  watch: UseFormWatch<Proyecto>;
  index: number;
  setValue: UseFormSetValue<Proyecto>;
}

const RepositoryForm: React.FC<RepositoryFormProps> = ({
  errors,
  register,
  type,
  index,
  setValue,
}: RepositoryFormProps) => {
  const marginRight = 2;

  const handleSelect = (value: string) => {
    let values = value.split('-');
    setValue(`repositorios.${index}.tecnologia`, parseInt(values[0]));
    setValue(`repositorios.${index}.versionDeTecnologia`, values[1]);
  };

  const titulo = useMemo(() => obtenerTipoDeRepositorio[type], [type]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        marginBottom: 4,
      }}
    >
      <Box>
        <Typography variant="h3Bold">{titulo}</Typography>

        <Divider />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="titleBold" marginRight={marginRight}>
          Repositorio
        </Typography>
        <CustomInput
          {...register(`repositorios.${index}.url`)}
          errorMessage={errors.repositorios?.[index]?.url?.message}
          variant="secondary"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="titleBold" marginRight={marginRight}>
          Tecnología
        </Typography>
        <CustomSelect
          variantDelta="secondary"
          onChange={(e) => handleSelect(e.target.value as string)}
          // {...(key === "repositorioBackend"
          //   ? register("repositorioBackend.id")
          //   : register("repositorioFrontend.id"))}
          errorMessage={
            errors.repositorios?.[index]?.message
          }
        >
          {obtenerOpcionesSelectTecnologia().get(type) != undefined &&
            obtenerOpcionesSelectTecnologia()
              .get(type)
              ?.map((option, key) => {
                return <MenuItem value={option.value} key={key}>{option.texto}</MenuItem>;
              })}
        </CustomSelect>
      </Box>
    </Box>
  );
};

export default Repositorios;

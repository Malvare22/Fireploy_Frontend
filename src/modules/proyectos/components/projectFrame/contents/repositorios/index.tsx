/* eslint-disable react-hooks/rules-of-hooks */
import CustomInput from "@modules/general/components/customInput";
import CustomSelect from "@modules/general/components/customSelect";
import { ProyectoContext } from "@modules/proyectos/context/proyectoContext";
import { TecnologiaRepositorio } from "@modules/proyectos/types/repositorio.tecnologia";
import { obtenerTipoDeRepositorio } from "@modules/proyectos/utils/obtenerTipoDeRepositorio";
import { obtenerOpcionesSelectTecnologia } from "@modules/proyectos/utils/separarTecnologias";
import {
  EdicionProyectoSchema,
  obtenerRepositorioBaseEdicion,
} from "@modules/proyectos/utils/zod/proyecto.edicion.schema";
import { Box, Divider, MenuItem, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

function Repositorios() {
  const context = useContext(ProyectoContext);

  if (!(context && context.proyecto)) {
    return <></>;
  }

  const { errors, register, watch, setValue, proyecto } = context;

  useEffect(() => {
    if (watch("numeroCapas") == proyecto.numeroCapas) {
      setValue("repositorios", proyecto.repositorios);
    } else {
      if (watch("numeroCapas") == 1) {
        setValue("repositorios", [obtenerRepositorioBaseEdicion("I")]);
      } else {
        setValue("repositorios", [
          obtenerRepositorioBaseEdicion("B"),
          obtenerRepositorioBaseEdicion("F"),
        ]);
      }
    }
  }, [watch("numeroCapas")]);

  return (
    <Box>
      <Typography variant="h3Bold">Repositorios</Typography>
      <Divider />
      <Box sx={{ display: "flex", marginY: 3 }}>
        <Typography variant="titleBold">Número de repositorios</Typography>
        <CustomSelect
          variantDelta="secondary"
          errorMessage={errors.numeroCapas?.message}
          // onChange={(e) => handleSelectNumeroCapas(e.target.value as string)}
          value={watch("numeroCapas")}
          {...register("numeroCapas")}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
        </CustomSelect>
      </Box>
      {watch("numeroCapas") == 1 ? (
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
  errors: FieldErrors<EdicionProyectoSchema>;
  register: UseFormRegister<EdicionProyectoSchema>;
  watch: UseFormWatch<EdicionProyectoSchema>;
  index: number;
  setValue: UseFormSetValue<EdicionProyectoSchema>;
}

const RepositoryForm: React.FC<RepositoryFormProps> = ({
  errors,
  register,
  type,
  index,
  setValue,
  watch,
}: RepositoryFormProps) => {
  const marginRight = 2;

  useEffect(() => {
    const valores = watch(
      `repositorios.${index}.tecnologia.nombreVersion`
    ).split(" ");
    setValue(`repositorios.${index}.tecnologia.nombre`, valores[0]);
    setValue(`repositorios.${index}.tecnologia.version`, valores[1]);
  }, [watch(`repositorios.${index}.tecnologia.nombreVersion`)]);

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
          errorMessage={errors.repositorios?.[index]?.message}
          {...register(`repositorios.${index}.tecnologia.nombreVersion`)}
          value={watch(`repositorios.${index}.tecnologia.nombreVersion`)}
        >
          {obtenerOpcionesSelectTecnologia().get(type) != undefined &&
            obtenerOpcionesSelectTecnologia()
              .get(type)
              ?.map((option, key) => {
                return (
                  <MenuItem value={option.value} key={key}>
                    {option.texto}
                  </MenuItem>
                );
              })}
        </CustomSelect>
      </Box>
    </Box>
  );
};

export default Repositorios;

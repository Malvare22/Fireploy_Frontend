import CustomInput from "@modules/general/components/customInput";
import CustomSelect from "@modules/general/components/customSelect";
import { TypeProyecto } from "@modules/general/utils/data/proyectos";
import {
  tecnologiasDummy,
  TypeTecnologia,
} from "@modules/general/utils/data/tecnologias";
import { ProyectoContext } from "@modules/projects/context/proyectoContext";
import { Box, Divider, MenuItem, Typography } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

function Repositories() {
  const context = useContext(ProyectoContext);

  if (!(context && context.proyecto)) {
    return <></>;
  }

  const { errors, register, watch } = context;

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
      {watch("numeroDeCapas") != 1 && (
        <RepositoryForm
          type="frontend"
          errors={errors}
          register={register}
          watch={watch}
        />
      )}
      <RepositoryForm
        type="backend"
        errors={errors}
        register={register}
        watch={watch}
      />
    </Box>
  );
}

interface RepositoryFormProps {
  type: TypeTecnologia["type"];
  errors: FieldErrors<TypeProyecto>;
  register: UseFormRegister<TypeProyecto>;
  watch: UseFormWatch<TypeProyecto>;
}

const RepositoryForm: React.FC<RepositoryFormProps> = ({
  errors,
  register,
  type,
  watch,
}: RepositoryFormProps) => {
  const marginRight = 2;

  const key: keyof TypeProyecto = useMemo(
    () => (type == "backend" ? "repositorioBackend" : "repositorioFrontend"),
    [type]
  );

  const filteredTechnologies = useMemo(
    () => tecnologiasDummy.filter((tec) => tec.type === type),
    [type]
  );

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
        <Typography variant="h3Bold">
          {type == "frontend" ? "Frontend" : "Backend"}
        </Typography>

        <Divider />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="titleBold" marginRight={marginRight}>
          Repositorio
        </Typography>
        <CustomInput
          {...(key === "repositorioBackend"
            ? register("repositorioBackend.url")
            : register("repositorioFrontend.url"))}
          errorMessage={
            key === "repositorioBackend"
              ? errors.repositorioBackend?.url?.message
              : errors.repositorioFrontend?.url?.message
          }
          variant="secondary"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="titleBold" marginRight={marginRight}>
          Tecnología
        </Typography>
        <CustomSelect
          variantDelta="secondary"
          {...(key === "repositorioBackend"
            ? register("repositorioBackend.id")
            : register("repositorioFrontend.id"))}
          errorMessage={
            key === "repositorioBackend"
              ? errors.repositorioBackend?.id?.message
              : errors.repositorioFrontend?.id?.message
          }
          value={
            key === "repositorioBackend"
              ? watch("repositorioBackend.id")
              : watch("repositorioFrontend.id")
          }
        >
          {filteredTechnologies?.map((tecnologia, index) => (
            <MenuItem key={index} value={tecnologia.id}>
              {tecnologia.text}
            </MenuItem>
          ))}
        </CustomSelect>
      </Box>
    </Box>
  );
};

export default Repositories;

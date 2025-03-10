import CustomInput from "@modules/general/components/customInput";
import Modal, { useModal } from "@modules/general/components/modal";
import Row from "@modules/general/components/row";
import { Box, MenuItem, Typography } from "@mui/material";
import GeneralButton, {
  ButtonContainer,
} from "@modules/general/components/buttons";
import { useContext, useEffect } from "react";
import CustomSelect from "@modules/general/components/customSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { crearMateriaService } from "@modules/materias/services/crear.materia.services";
import { useParams } from "react-router-dom";
import { AccountContext } from "@modules/general/context/accountContext";
import { MateriaBase } from "@modules/materias/utils/base.materia";
import { obtenerMateriaPorIdService } from "@modules/materias/services/obtenerPorId.materia.services";
import useQuery from "@modules/general/hooks/useQuery";
import {
  Materia,
  MateriaSchema,
} from "@modules/materias/utils/forms/schema.materias";
import { adaptarMateriaServiceAMateria } from "@modules/materias/utils/adapters/adaptar.materiaService.materia";
import { editarMateriaService } from "@modules/materias/services/editar.materia.services";
import {
  listaSemestresMaterias,
  obtenerEstadoMateria,
} from "@modules/materias/utils/map.materias";

type ModalModificarMateriaProps = {
  tipo: "editar" | "crear";
};

export enum ModificarCursoLabels {
  modificar = "Modificar Curso",
  crear = "Crear Curso",
  nombre = "Nombre de la Materia",
  semestre = "Semestre",
  estado = "Estado",
}

export const ModalModificarMateria: React.FC<ModalModificarMateriaProps> = ({
  tipo,
}) => {
  const { handleClose, handleOpen, open } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    watch,
  } = useForm<Materia>({
    resolver: zodResolver(MateriaSchema),
    defaultValues: MateriaBase,
  });

  console.log(getValues());

  useEffect(() => {
    handleOpen();
  }, []);

  const { id } = useParams();

  const token = useContext(AccountContext)?.localUser?.token ?? "";

  const { RenderAlertDialog, init, responseData } = useQuery(
    () => obtenerMateriaPorIdService(token, id ?? ""),
    "Gestión Materias",
    false,
    false
  );

  useEffect(() => {
    if (token == "" || id == undefined) return;

    init();
  }, [token, id]);

  useEffect(() => {
    if (responseData == undefined) return;
    reset(adaptarMateriaServiceAMateria(responseData));
  }, [responseData]);

  const consulta = () => {
    console.log(getValues());
    if (tipo == "crear") {
      return crearMateriaService(token, getValues());
    }
    return editarMateriaService(token, getValues());
  };

  const { RenderAlertDialog: AccionRenderAlertDialog, init: accionInit } =
    useQuery(
      consulta,
      "Gestión Materias",
      true,
      true,
      "¿Está seguro de que desea guardar estos datos?",
      true
    );

  const onSubmit = () => {
    accionInit();
  };

  return (
    <>
      <RenderAlertDialog />
      <AccionRenderAlertDialog />

      <Modal
        handleClose={handleClose}
        open={open}
        titulo={
          tipo === "editar"
            ? ModificarCursoLabels.modificar
            : ModificarCursoLabels.crear
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2, sm: 4 },
            }}
          >
            <Row>
              <Box sx={{ width: 120 }}>
                <Typography variant="titleBold">
                  {ModificarCursoLabels.nombre}
                </Typography>
              </Box>
              <CustomInput
                {...register("nombre")}
                errorMessage={errors.nombre?.message}
              />
            </Row>

            <Row>
              <Box sx={{ width: 120 }}>
                <Typography variant="titleBold">
                  {ModificarCursoLabels.semestre}
                </Typography>
              </Box>
              <CustomSelect
                {...register("semestre")}
                value={watch("semestre")}
                variantDelta="secondary"
              >
                {listaSemestresMaterias.map((valor) => (
                  <MenuItem value={valor} key={valor}>
                    {valor}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Row>

            <Row>
              <Box sx={{ width: 120 }}>
                <Typography variant="titleBold">
                  {ModificarCursoLabels.estado}
                </Typography>
              </Box>
              <CustomSelect
                {...register("estado")}
                value={watch("estado")}
                variantDelta="secondary"
              >
                {Array.from(obtenerEstadoMateria.entries()).map(
                  ([valor, texto]) => (
                    <MenuItem value={valor} key={valor}>
                      {texto}
                    </MenuItem>
                  )
                )}
              </CustomSelect>
            </Row>

            <Row>
              <ButtonContainer _justifyContent="center">
                <Box>
                  <GeneralButton deltaVariant="save" type="submit" />
                </Box>
                <Box>
                  <GeneralButton deltaVariant="cancel" onClick={handleClose} />
                </Box>
              </ButtonContainer>
            </Row>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default ModalModificarMateria;

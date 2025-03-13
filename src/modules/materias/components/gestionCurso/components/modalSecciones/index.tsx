import { zodResolver } from "@hookform/resolvers/zod";
import GeneralButton, {
  ButtonContainer,
} from "@modules/general/components/buttons";
import CustomInput from "@modules/general/components/customInput";
import CustomSelect from "@modules/general/components/customSelect";
import CustomTextArea from "@modules/general/components/customTextArea";
import Modal from "@modules/general/components/modal";
import Row from "@modules/general/components/row";
import { AccountContext } from "@modules/general/context/accountContext";
import useQuery from "@modules/general/hooks/useQuery";
import { buttonTypes } from "@modules/general/types/buttons";
import { LabelCurso } from "@modules/materias/enums/labelCurso";
import { LabelSeccion } from "@modules/materias/enums/labelSeccion";
import { crearSeccionService } from "@modules/materias/services/crear.secciones.services";
import { editarSeccionService } from "@modules/materias/services/editar.secciones.services";
import { SeccionCurso } from "@modules/materias/types/curso.seccion";
import {
  seccionBase,
  SeccionSchema,
} from "@modules/materias/utils/forms/schema.curso copy";
import { obtenerEstadoMateria } from "@modules/materias/utils/map.materias";
import { Box, MenuItem, Typography } from "@mui/material";
import { useContext } from "react";
import { useForm } from "react-hook-form";

type ModalSeccionProps = {
  tipo: "editar" | "crear";
  handleClose: () => void;
  open: boolean;
  cursoId: number;
  seccion?: SeccionCurso;
};
const ModalSeccion: React.FC<ModalSeccionProps> = ({
  tipo,
  handleClose,
  open,
  cursoId,
  seccion,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<SeccionCurso>({
    resolver: zodResolver(SeccionSchema),
    defaultValues: tipo == "editar" && seccion ? seccion : seccionBase,
  });

  const token = useContext(AccountContext)?.localUser?.token ?? "";

  const consulta = () => {
    if (tipo == "crear") {
      return crearSeccionService(token, getValues(), cursoId);
    }
    return editarSeccionService(token, getValues());
  };

  const { RenderAlertDialog, init } = useQuery<unknown>(
    () => consulta(),
    LabelCurso.gestionCursos,
    true,
    true,
    "¿Está seguro de que desea guardar estos datos?",
    true
  );

  const onSubmit = async () => {
    await init();
  };

  return (
    <>
      <RenderAlertDialog />
      <Modal
        handleClose={handleClose}
        open={open}
        titulo={tipo === "editar" ? LabelSeccion.editar : LabelSeccion.crear}
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
                  {LabelSeccion.titulo}
                </Typography>
              </Box>
              <CustomInput {...register("titulo")}  errorMessage={errors.titulo?.message}/>
            </Row>

            <Row>
              <Box sx={{ width: 120 }}>
                <Typography variant="titleBold">
                  {LabelSeccion.estado}
                </Typography>
              </Box>
              <CustomSelect
                {...register("estado")}
                value={watch("estado")}
                variantDelta="secondary"
                errorMessage={errors.estado?.message}
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
              <Box sx={{ width: 120 }}>
                <Typography variant="titleBold">
                  {LabelSeccion.descripcion}
                </Typography>
              </Box>
              <CustomTextArea {...register("descripcion")} />
            </Row>

            <Row>
              <Box sx={{ width: 120 }}>
                <Typography variant="titleBold">
                  {LabelSeccion.fechaInicio}
                </Typography>
              </Box>
              <CustomInput type="date" {...register("fechaDeInicio")}  errorMessage={errors.fechaDeInicio?.message}/>
            </Row>

            <Row>
              <Box sx={{ width: 120 }}>
                <Typography variant="titleBold">
                  {LabelSeccion.fechaCierre}
                </Typography>
              </Box>
              <CustomInput type="date" {...register("fechaDeCierre")}  errorMessage={errors.fechaDeCierre?.message}/>
            </Row>

            <Row>
              <ButtonContainer _justifyContent="center">
                <Box>
                  <GeneralButton mode={buttonTypes.save} type="submit" />
                </Box>
                <Box>
                  <GeneralButton
                    mode={buttonTypes.cancel}
                    onClick={handleClose}
                  />
                </Box>
              </ButtonContainer>
            </Row>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default ModalSeccion;

import { zodResolver } from "@hookform/resolvers/zod";
import GeneralButton, { ButtonContainer } from "@modules/general/components/buttons";
import CustomSelect from "@modules/general/components/customSelect";
import Modal from "@modules/general/components/modal";
import Row from "@modules/general/components/row";
import { AccountContext } from "@modules/general/context/accountContext";
import useQuery from "@modules/general/hooks/useQuery";
import { buttonTypes } from "@modules/general/types/buttons";
import { LabelCurso } from "@modules/materias/enums/labelCurso";
import { crearCursoService } from "@modules/materias/services/crear.curso.services";
import { editarCursoService } from "@modules/materias/services/modificar.curso.services";
import { CursoModal, cursoModalBase, CursoModalSchema } from "@modules/materias/utils/forms/schema.curso";
import { obtenerEstadoMateria } from "@modules/materias/utils/map.materias";
import { Box, MenuItem, Typography } from "@mui/material";
import { useContext } from "react";
import { useForm } from "react-hook-form";

type ModalModificarCursoProps = {
  tipo: "editar" | "crear";
  curso?: CursoModal,
  handleClose: () => void;
  open: boolean;
};
export const ModalModificarMateria: React.FC<ModalModificarCursoProps> = ({
  tipo,
  handleClose,
  open,
  curso
}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<CursoModal>({
    resolver: zodResolver(CursoModalSchema),
    defaultValues: tipo == 'editar' && curso ? curso : cursoModalBase,
  });

  const token = useContext(AccountContext)?.localUser?.token ?? "";

  const consulta = () => {
    if (tipo == "crear") {
      return crearCursoService(token, getValues());
    }
    return editarCursoService(token, getValues(), 'idCurso');
  };

  const { RenderAlertDialog, init } =
    useQuery(
      consulta,
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
        titulo={
          tipo === "editar"
            ? LabelCurso.editarCurso
            : LabelCurso.crearCurso
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
                  {LabelCurso.estado}
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
                  <GeneralButton mode={buttonTypes.save} type="submit" />
                </Box>
                <Box>
                  <GeneralButton mode={buttonTypes.cancel} onClick={handleClose} />
                </Box>
              </ButtonContainer>
            </Row>
          </Box>
        </form>
      </Modal>
    </>
  );
};
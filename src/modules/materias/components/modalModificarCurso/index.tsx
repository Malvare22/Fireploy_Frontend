import { zodResolver } from "@hookform/resolvers/zod";
import GeneralButton, {
  ButtonContainer,
} from "@modules/general/components/buttons";
import CustomSelect from "@modules/general/components/customSelect";
import CustomTextArea from "@modules/general/components/customTextArea";
import Modal from "@modules/general/components/modal";
import Row from "@modules/general/components/row";
import SearchUsers from "@modules/general/components/searchUsers";
import { useSearchUsers } from "@modules/general/components/searchUsers/hook";
import { AccountContext } from "@modules/general/context/accountContext";
import useQuery from "@modules/general/hooks/useQuery";
import { buttonTypes } from "@modules/general/types/buttons";
import { LabelCurso } from "@modules/materias/enums/labelCurso";
import { crearCursoService } from "@modules/materias/services/crear.curso.services";
import { editarCursoService } from "@modules/materias/services/modificar.curso.services";
import { CursoMateria } from "@modules/materias/types/materia.curso";
import { adaptarCursoACursoModal } from "@modules/materias/utils/adapters/adaptar.curso";
import {
  CursoModal,
  cursoModalBase,
  CursoModalSchema,
} from "@modules/materias/utils/forms/schema.curso";
import { obtenerEstadoMateria } from "@modules/materias/utils/map.materias";
import { obtenerUsuariosPorTipoService } from "@modules/usuarios/services/obtenerUsuariosPorTipo";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { adaptarUsuarioServiceAUsuarioCampoDeBusqueda } from "@modules/usuarios/utils/adaptar.usuario";
import { Box, MenuItem, Typography } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type ModalModificarCursoProps = {
  tipo: "editar" | "crear";
  handleClose: () => void;
  open: boolean;
  materiaId: number;
  curso?: CursoMateria;
  totalCursos?: number;
};
const ModalModificarCurso: React.FC<ModalModificarCursoProps> = ({
  tipo,
  handleClose,
  open,
  curso,
  materiaId,
  totalCursos,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = useForm<CursoModal>({
    resolver: zodResolver(CursoModalSchema),
    defaultValues:
      tipo == "editar" && curso
        ? adaptarCursoACursoModal(curso)
        : cursoModalBase,
  });

  const token = useContext(AccountContext)?.localUser?.token ?? "";

  const consulta = () => {
    if (tipo == "crear") {
      return crearCursoService(token, getValues(), materiaId, totalCursos ?? 0);
    }
    return editarCursoService(token, getValues(), curso?.id ?? "");
  };

  const [docentes, setDocentes] = useState<UsuarioService[]>([]);

  const {
    RenderAlertDialog: RenderAlertaDocentes,
    init: initBuscarDocentes,
    responseData: responseDocentes,
  } = useQuery(
    () => obtenerUsuariosPorTipoService("Docente", token),
    LabelCurso.gestionCursos,
    false,
    false
  );

  useEffect(() => {
    if (open == false) return;
    const _consulta = async () => {
      await initBuscarDocentes();
    };

    _consulta();
  }, [open]);

  console.log(getValues());

  useEffect(() => {
    if (responseDocentes) {
      setDocentes(responseDocentes);
      const _docenteInicial = responseDocentes.find((u) => {
        return u.id == getValues("docente");
      });
      if (_docenteInicial)
        setSelectUser(
          adaptarUsuarioServiceAUsuarioCampoDeBusqueda(_docenteInicial)
        );
    }
  }, [responseDocentes]);

  const { selectUser, setSelectUser } = useSearchUsers();

  const { RenderAlertDialog, init } = useQuery(
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

  const docentesToRender = useMemo(() => {
    return docentes.map((docente) =>
      adaptarUsuarioServiceAUsuarioCampoDeBusqueda(docente)
    );
  }, [docentes]);

  useEffect(() => {
    if (!responseDocentes) return;
    if (selectUser) setValue("docente", selectUser.id);
    else setValue("docente", -1);
  }, [selectUser]);

  return (
    <>
      <RenderAlertDialog />
      <RenderAlertaDocentes />
      <Modal
        handleClose={handleClose}
        open={open}
        titulo={
          tipo === "editar" ? LabelCurso.editarCurso : LabelCurso.crearCurso
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
                <Typography variant="titleBold">{LabelCurso.estado}</Typography>
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
                <Typography variant="titleBold">{LabelCurso.estado}</Typography>
              </Box>
              <CustomTextArea {...register("descripcion")} />
            </Row>

            <Row>
              <Box sx={{ width: 120 }}>
                <Typography variant="titleBold">
                  {LabelCurso.docente}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <SearchUsers
                  users={docentesToRender}
                  setSelectUser={setSelectUser}
                  selectUser={selectUser}
                />
                <Box marginY={1}>
                  <Typography variant="title" color="error">
                    {errors.docente?.message}
                  </Typography>
                </Box>
              </Box>
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

export default ModalModificarCurso;

import GeneralButton from "@modules/general/components/buttons";
import SearchUsers from "@modules/general/components/searchUsers";
import {
  useSearchUsers,
  UsuarioCampoBusqueda,
} from "@modules/general/components/searchUsers/hook";
import SelectUserFrame from "@modules/general/components/selectUserFrame";
import {
  StyledTableCell,
  StyledTableRow,
} from "@modules/general/components/tabla";
import { AccountContext } from "@modules/general/context/accountContext";
import { LabelGeneral } from "@modules/general/enums/labelGeneral";
import useQuery from "@modules/general/hooks/useQuery";
import useTabla from "@modules/general/hooks/useTabla";
import { buttonTypes } from "@modules/general/types/buttons";
import { LabelCurso } from "@modules/materias/enums/labelCurso";
import { gestionarEstudiantesCursoService } from "@modules/materias/services/gestionar.estudiantes.curso";
import { CursoService } from "@modules/materias/types/curso.service";
import { LabelTablaUsuarios } from "@modules/usuarios/enum/LabelTablaUsuarios";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { obtenerUsuariosPorTipoService } from "@modules/usuarios/services/obtenerUsuariosPorTipo";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { adaptarUsuarioServiceAUsuarioCampoDeBusqueda } from "@modules/usuarios/utils/adaptar.usuario";
import {
  Box,
  Card,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";

/**
 * @param estudiantes: Los estudiantes que se encuentran registrados en el curso
 * @returns
 */
const SeccionEstudiantes: React.FC<{ estudiantes: UsuarioService[] }> = ({
  estudiantes,
}) => {
  const {
    orderBy,
    order,
    handleRequestSort,
    renderData,
    setData,
    RenderSearchInput,
  } = useTabla<UsuarioService>();

  useEffect(() => {
    setData(estudiantes);
  }, []);

  const navigate = useNavigate();

  console.log(estudiantes)

  /**
   * Lista de estudiantes para eliminar
   */
  const [selectStudentsRemove, setSelectStudentsRemove] = useState<number[]>(
    []
  );

  /**
   * Lista de estudiantes para agregar
   */
  const [selectStudentsAdd, setSelectStudentsAdd] = useState<
    UsuarioCampoBusqueda[]
  >([]);

  const token = useContext(AccountContext)?.localUser?.token;

  const handleSelectStudents = (id: number) => {
    const _buffer = selectStudentsRemove.filter(
      (_estudiante) => _estudiante != id
    );

    if (_buffer.length == selectStudentsRemove.length) {
      _buffer.push(id);
    }

    setSelectStudentsRemove(_buffer);
  };

  /**
   * Lista de estudiantes disponibles en la plataforma y que no se encuentran en el curso
   */
  const [allStudents, setAllStudents] = useState<UsuarioCampoBusqueda[]>([]);

  const {
    RenderAlertDialog: RenderObtenerEstudiantes,
    init: initObtenerEstudiantes,
    responseData: responseEstudiantes,
  } = useQuery<UsuarioService[]>(
    () => obtenerUsuariosPorTipoService("Estudiante", token ?? ""),
    "Estudiantes Curso",
    false,
    false
  );

  useEffect(() => {
    if (!token) return;
    const request = async () => {
      await initObtenerEstudiantes();
    };

    request();
  }, [token]);

  useEffect(() => {
    if (responseEstudiantes == undefined) return;
    let estudiantesAislados: UsuarioService[] = [...responseEstudiantes];
    estudiantes.forEach((estudianteMatriculado) => {
      estudiantesAislados = estudiantesAislados.filter(
        (estudiante) => estudiante.id != estudianteMatriculado.id
      );
    });

    const adaptados = estudiantesAislados.map((estudiante) =>
      adaptarUsuarioServiceAUsuarioCampoDeBusqueda(estudiante)
    );
    setAllStudents(adaptados);
  }, [responseEstudiantes]);

  const Confirmation = () => (
    <Box>
      <Box>¿Está seguro de que desea eliminar a los usuarios de código:</Box>
      <Box>
        {selectStudentsRemove.map((student) => (
          <>
            <br></br>
            {student}
          </>
        ))}
        ?
      </Box>
    </Box>
  );

  /**
   * Usuario seleccionado para ser agregado al buffer de agregar estudiantes
   */
  const { selectUser, setSelectUser } = useSearchUsers();

  const handleRemoveOfAdd = (id: number) => {
    const buffer = selectStudentsAdd.filter((student) => student.id != id);

    setSelectStudentsAdd(buffer);
  };

  const handleDelete = async () => {
    await initDelete();
  };

  /**
   * UseEffect que agrega a el buffer de estudiantes seleccionados para matricular
   */
  useEffect(() => {
    if (!selectUser) return;
    selectStudentsAdd.forEach((student) => {
      if (student.id == selectUser.id) return;
    });

    const buffer = [...selectStudentsAdd, selectUser];

    setSelectStudentsAdd(buffer);
  }, [selectUser]);

  const { RenderAlertDialog: RenderDelete, init: initDelete } =
    useQuery<CursoService>(
      () =>
        gestionarEstudiantesCursoService(
          token ?? "",
          selectStudentsRemove,
          "D",
          token ?? ""
        ),
      "Eliminar Estudiantes del Curso",
      true,
      true,
      undefined,
      true,
      undefined,
      <Confirmation />
    );

  return (
    <Card sx={{ padding: 3 }}>
      <RenderDelete />
      <RenderObtenerEstudiantes />
      <Box>
        <Typography variant="h3Bold">{LabelCurso.estudiantes}</Typography>
        <Divider />
      </Box>
      <Box sx={{ width: {md: 500} }}>{RenderSearchInput}</Box>
      <Box sx={{ display: "flex", flexDirection: {md: 'row', xs: 'column'}, gap: {md: 6, xs: 3} }}>
        <TableContainer component={Paper} sx={{ width: {md: 500}, height: {md: 500} }}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderBy === "id" ? order : "asc"}
                    onClick={() => {
                      handleRequestSort("id");
                    }}
                  >
                    {LabelTablaUsuarios.codigo}
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  {LabelTablaUsuarios.nombreCompleto}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {LabelTablaUsuarios.porfolio}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {LabelGeneral.acciones}
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {renderData.map((usuario, key) => (
                <StyledTableRow key={key}>
                  <StyledTableCell>{usuario.id}</StyledTableCell>
                  <StyledTableCell>{`${usuario.nombre} ${usuario.nombre}`}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title={LabelTablaUsuarios.porfolio}>
                      <IconButton
                        onClick={() =>
                          navigate(
                            rutasUsuarios.verPortafolio.replace(
                              ":id",
                              usuario.id.toString()
                            )
                          )
                        }
                      >
                        <DocumentScannerIcon />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Checkbox
                      onClick={() => {
                        handleSelectStudents(usuario.id);
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
          <Box><GeneralButton
            mode={buttonTypes.remove}
            onClick={handleDelete}
            disabled={selectStudentsRemove.length == 0}
          /></Box>
          <SearchUsers
            selectUser={selectUser}
            setSelectUser={setSelectUser}
            users={allStudents}
          />
          {/* Campo Usuario a agregar */}
          <Card sx={{ border: "1px solid black", width: {md: 400}, minHeight: 300 }}>
            {selectStudentsAdd.map((student) => (
              <SelectUserFrame
                user={student}
                key={student.id}
                onClick={() => handleRemoveOfAdd(student.id)}
              />
            ))}
          </Card>
          <GeneralButton
            mode={buttonTypes.add}
            onClick={handleDelete}
            disabled={selectStudentsAdd.length == 0}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default SeccionEstudiantes;

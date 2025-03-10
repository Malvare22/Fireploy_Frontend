// import {
//   StyledTableCell,
//   StyledTableRow,
// } from "@modules/general/components/tabla";
// import FolderZipIcon from "@mui/icons-material/FolderZip";
// import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
// import {
//   Box,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableContainer,
//   TableFooter,
//   TableHead,
//   TableSortLabel,
//   Tooltip,
// } from "@mui/material";
// import IconosAccionesBasicas from "@modules/general/components/iconosAccionesBasicas";
// import {
//   obtenerEstadoUsuario,
//   obtenerTiposUsuario,
// } from "@modules/usuarios/utils/usuario.map";
// import useTabla from "@modules/general/hooks/useTabla";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { rutasUsuarios } from "@modules/usuarios/router/router";
// import { Materia } from "@modules/materias/types/materia";
// import { labelTablaMaterias } from "@modules/materias/enums/tablaMaterias";
// import { materiasPrueba } from "@modules/materias/utils/data/materias.prueba";
// import { filtrosMaterias } from "@modules/materias/utils/filtros.materias";

// export const LabelTablaUsuarios = {
//   codigo: "Código",
//   nombreCompleto: "Nombre Completo",
//   tipoUsuario: "Tipo de Usuario",
//   estado: "Estado",
//   proyectos: "Proyectos",
//   porfolio: "Portafolio",
// };

// function ListarMaterias() {
//   const materias = materiasPrueba;

//   const {
//     handleRequestSort,
//     order,
//     orderBy,
//     setData,
//     renderData,
//     FillEmptyRows,
//     Pagination,
//     RenderSearchInput,
//     setFilterLabels,
//     RenderFilters,
//   } = useTabla<Materia>();

//   useEffect(() => {
//     setData(materias);
//     setFilterLabels(filtrosMaterias(materias));
//   }, []);

//   const navigate = useNavigate();

//   // const [selectMateria, setSelectMateria] = useState<Materia | undefined>(
//   //   undefined
//   // );

//   // const {
//   //   handleClose: estadoHandleClose,
//   //   handleOpen: estadoHandleOpen,
//   //   open: estadoOpen,
//   // } = useModal();

//   // const { open, handleOpen, handleClose } = useModal();

//   // const handleVentanaEstado = (usuario: UsuarioPlano) => {
//   //   setSelectUsuario(adaptarUsuario(usuario));
//   //   estadoHandleOpen();
//   // };

//   // const handleEditar = (usuario: UsuarioPlano) => {
//   //   setSelectUsuario(adaptarUsuario(usuario));
//   //   handleOpen();
//   // };

//   return (
//     <>
//       {/* {selectUsuario != undefined && (
//         <ModalEstadoUsuario
//           handleClose={estadoHandleClose}
//           open={estadoOpen}
//           usuario={selectUsuario}
//         />
//       )} */}
//       {/* <ModalUsuario
//         handleClose={handleClose}
//         open={open}
//         handleQuery={() => alert(":D")}
//         tipo="editar"
//         usuario={selectUsuario}
//       /> */}
//       <Box sx={{ width: { md: "100%", xs: "90%" } }}>
//         <Box
//           sx={{ display: "flex", flexDirection: { xl: "row", xs: "column" } }}
//         >
//           <RenderFilters />
//           <Box sx={{ marginY: 0, flex: 1 }}>{RenderSearchInput}</Box>
//         </Box>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <StyledTableRow>
//                 <StyledTableCell>
//                   <TableSortLabel
//                     active={orderBy === "id"}
//                     direction={orderBy === "id" ? order : "asc"}
//                     onClick={() => {
//                       handleRequestSort("id");
//                     }}
//                   >
//                     {labelTablaMaterias.idMateria}
//                   </TableSortLabel>
//                 </StyledTableCell>
//                 <StyledTableCell>
//                   {labelTablaMaterias.nombre}
//                 </StyledTableCell>
//                 <StyledTableCell>
//                   {labelTablaMaterias.semestre}
//                 </StyledTableCell>
//                 <StyledTableCell align="center">
//                   <TableSortLabel
//                     active={orderBy === "cantidadDeCursos"}
//                     direction={orderBy === "cantidadDeCursos" ? order : "asc"}
//                     onClick={() => {
//                       handleRequestSort("cantidadDeCursos");
//                     }}
//                   >
//                     {labelTablaMaterias.cursos}
//                   </TableSortLabel>
//                 </StyledTableCell>
//                 <StyledTableCell align="center">
//                   {labelTablaMaterias.acciones}
//                 </StyledTableCell>
//               </StyledTableRow>
//             </TableHead>
//             <TableBody>
//               {renderData.map((materia, key) => (
//                 <StyledTableRow key={key}>
//                   <StyledTableCell>{materia.id}</StyledTableCell>
//                   <StyledTableCell>{materia.nombre}</StyledTableCell>
//                   <StyledTableCell>{materia.semestre}</StyledTableCell>
//                   <StyledTableCell>{materia.id}</StyledTableCell>
//                   <StyledTableCell>{materia.id}</StyledTableCell>
//                 </StyledTableRow>
//               ))}
//               {FillEmptyRows}
//             </TableBody>
//             <TableFooter>
//               <Pagination />
//             </TableFooter>
//           </Table>
//         </TableContainer>
//       </Box>
//     </>
//   );
// }

// export default ListarMaterias;

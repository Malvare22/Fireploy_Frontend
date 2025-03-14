// import CellUser from "@modules/usuarios/components/VistaPreviaUsuario";
// import { Box, Divider, Typography } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { useState } from "react";
// import AlertDialog from "@modules/general/components/alertDialog";
// import { usuariosPrueba } from "@modules/usuarios/test/data/usuarios.prueba";
// import VistaPreviaUsuario from "@modules/usuarios/components/VistaPreviaUsuario";
// import { UsuarioPlano } from "@modules/usuarios/types/usuario.plano";
// import { LabelColaboradores } from "@modules/proyectos/enum/labelColaboradores";
// import { rutasUsuarios } from "@modules/usuarios/router/router";
// import SearchUsers from "@modules/general/components/searchUsers";
// import { useSearchUsers } from "@modules/general/components/searchUsers/hook";

// function Colaboradores() {

//   const [open, setOpen] = useState(false);

//   type Modo = "agregar" | "eliminar";

//   const [modo, setModo] = useState<Modo>("agregar");

//   const handleUser = (usuario: UsuarioPlano, modo: Modo = "agregar") => {
//     setSelectUser(usuario);
//     setModo(modo);
//     setOpen(true);
//   };

//   const DialogAgregar = () => {
//     const BotonesDialogAgregar = () => (
//       <BotonesBasicos
//         aceptar={() => {
//           alert("Aceptado");
//         }}
//         cancelar={() => {
//           setOpen(false);
//         }}
//       />
//     );
//     return (
//       <>
//         {selectUser && (
//           <AlertDialog
//             titulo={LabelColaboradores.tituloAgregarUsuario}
//             open={open}
//             botones={<BotonesDialogAgregar />}
//             cuerpo={LabelColaboradores.cuerpoAgregarUsuario}
//           >
//             <Box marginY={2}>
//               <VistaPreviaUsuario
//                 usuario={selectUser}
//                 type="portafolio"
//                 url={rutasUsuarios.verPerfilPorId.replace(
//                   ":id",
//                   selectUser.id.toString()
//                 )}
//               />
//             </Box>
//           </AlertDialog>
//         )}
//       </>
//     );
//   };

//   const DialogEliminar = () => {
//     const BotonesDialogEliminar = () => (
//       <BotonesBasicos
//         aceptar={() => {
//           alert("Aceptado");
//         }}
//         cancelar={() => {
//           setOpen(false);
//         }}
//       />
//     );
//     return (
//       <>
//         {selectUser && (
//           <AlertDialog
//             titulo={LabelColaboradores.tituloEliminarUsuario}
//             open={open}
//             botones={<BotonesDialogEliminar />}
//             cuerpo={LabelColaboradores.cuerpoEliminarUsuario}
//           >
//             <Box marginY={2}>
//               <VistaPreviaUsuario
//                 usuario={selectUser}
//                 type="portafolio"
//                 url={rutasUsuarios.verPerfilPorId.replace(
//                   ":id",
//                   selectUser.id.toString()
//                 )}
//               />
//             </Box>
//           </AlertDialog>
//         )}
//       </>
//     );
//   };

//   const {selectUser, setSelectUser} = useSearchUsers();

//   return (
//     <Box>
//       <Typography variant="h3Bold">{LabelColaboradores.titulo}</Typography>

//       <Divider sx={{ marginBottom: 3 }} />
//       <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
//         <SearchIcon sx={{ marginRight: 2 }} />
//         <SearchUsers selectUser={selectUser} setSelectUser={setSelectUser} users={[]}/>
//       </Box>

//       <Box sx={{ backgroundColor: "backgroundX.panel" }}>
//         {usuariosPrueba.map((user) => (
//           <Box sx={{ padding: 2, border: "1px solid rgba(0, 0, 0, .1)" }}>
//             <CellUser
//               usuario={user}
//               type="list"
//               url={rutasUsuarios.verPerfilPorId.replace(
//                 ":id",
//                 user.id.toString()
//               )}
//               deleteAction={() => handleUser(user, "eliminar")}
//             />
//           </Box>
//         ))}
//       </Box>
//       {selectUser &&
//         (modo == "agregar" ? <DialogAgregar /> : <DialogEliminar />)}
//     </Box>
//   );
// }

// export default Colaboradores;

import InputDeBusqueda from "@modules/general/components/inputDeBusqueda";
import { LabelUsuario } from "@modules/usuarios/enum/LabelUsuario";
import { usuariosPrueba } from "@modules/usuarios/test/data/usuarios.prueba";
import { UsuarioPlano } from "@modules/usuarios/types/usuario.plano";
import { obtenerTiposUsuario } from "@modules/usuarios/utils/usuario.map";
import {
  Box,
  Button,
  Card,
  Divider,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { LabelPortafolio } from "@modules/usuarios/enum/LabelPortafolio";
import ExploreIcon from "@mui/icons-material/Explore";
import usePaginacion from "@modules/general/hooks/usePaginacion";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { NavigateFunction, useNavigate } from "react-router-dom";

function BuscarPortafolio() {
  const usuarios = usuariosPrueba;

  const [search, setSearch] = useState("");

  const filtradoUsuarios = () => {
    if (search != "") {
      return usuarios.filter((usuario) =>
        (usuario.nombres + usuario.apellidos).toLowerCase().includes(search)
      );
    }
    return usuarios;
  };

  const { mostrarDatos, setPagina, totalPaginas, setDatos } = usePaginacion(5);

  const navigate = useNavigate();

  useEffect(() => {
    setDatos(filtradoUsuarios);
  }, [, search]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box>
          <Typography variant="h3Bold">
            {LabelPortafolio.explorarPortafolios}
          </Typography>
        </Box>
        <ExploreIcon
          sx={{
            fontSize: 48,
          }}
        />
      </Box>
      <Card
        sx={{
          marginY: 4,
          padding: 2,
          width: { lg: "60%", xs: "90%" },
          borderRadius: 4,
        }}
      >
        <InputDeBusqueda
          search={search}
          setSearch={setSearch}
        ></InputDeBusqueda>
      </Card>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {mostrarDatos.map((usuario, key) => (
          <Box
            sx={{
              width: {
                lg: "60%",
              },
            }}
          >
            <PreviewUsuario usuario={usuario} key={key} navigate={navigate}/>
            <Divider />
          </Box>
        ))}
      </Box>
      <Pagination
        count={totalPaginas}
        onChange={(_e, value) => setPagina(value)}
        sx={{
          marginY: 2,
        }}
      />
    </Box>
  );
}

interface PreviewUsuarioProps {
  usuario: UsuarioPlano;
  navigate: NavigateFunction
}
export const PreviewUsuario: React.FC<PreviewUsuarioProps> = ({ usuario, navigate }) => {

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 3,
        ':hover':{
            boxShadow: 10
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box
          component={"img"}
          width={90}
          height={90}
          borderRadius={4}
          border={"1px solid black"}
          src={usuario.fotoDePerfil}
        />
        <Box>
          <Box>
            <Typography variant="titleBold">{`${usuario.apellidos} ${usuario.nombres}`}</Typography>
          </Box>
          <Box marginTop={1}>
            <Typography variant="title2">
              {obtenerTiposUsuario.get(usuario.tipo)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          endIcon={<AccountCircleIcon />}
          onClick={() => {
            navigate(
              rutasUsuarios.verPortafolio.replace(":id", usuario.id.toString())
            );
          }}
        >
          {LabelUsuario.verPortafolio}
        </Button>
      </Box>
    </Card>
  );
};

export default BuscarPortafolio;

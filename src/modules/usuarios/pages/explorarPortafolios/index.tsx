import { labelListarPortafolios } from "@modules/usuarios/enum/labelListarPortafolios";
import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import {  Grid2, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import {  useContext, useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import useOrderSelect from "@modules/general/hooks/useOrderSelect";
import { labelSelects } from "@modules/general/enums/labelSelects";
import PortafolioCard from "@modules/general/components/portafolioCard";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { getUsuariosPorTipo } from "@modules/usuarios/services/get.usuarios.[tipo]";
import useQuery from "@modules/general/hooks/useQuery";
import { adaptarUsuarioAUsuarioCardPortafolio, adapterUsuario } from "@modules/usuarios/utils/adaptar.usuario";
import { useAuth } from "@modules/general/context/accountContext";

function ExplorarPortafolios() {

  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  const { initQuery, responseData } =
    useQuery<UsuarioService[]>(
      () => getUsuariosPorTipo('todos', token!!),
      false,
      "Obtener Usuarios"
    );

  const [usuarios, setUsuarios] = useState<UsuarioPortafolioCard[]>([]);

    useEffect(() => {
     if(token) initQuery();
    }, [token]);

    useEffect(() => {
      if(responseData){
        setUsuarios(responseData.map((usuario) => adaptarUsuarioAUsuarioCardPortafolio(adapterUsuario(usuario))))
      };
     }, [responseData]);

  // useEffect(() => {
  //   if (token && id) {
  //     initQuery();
  //   }
  // }, [token, id]);

  // useEffect(() => {
  //   if (responseData) {
  //     setMateria(adaptarMateriaService(responseData));
  //   }
  // }, [responseData]);

    const {handleRequestSort, setOrderBy} = useOrderSelect();

    const [search, setSearch] = useState<string>("");
  
    // const _filterSearchData = useMemo(() => {
    //   // if (search != "")
    //   //   return stableSort(usuarios).filter((usuario) =>
    //   //     usuario[''].toLowerCase().includes(search.toLowerCase())
    //   //   );
    //   return stableSort(usuarios);
    // }, [search, usuarios, stableSort]);

  return (
    <>
      {/* {error && (
        <AlertDialog
          handleAccept={handleAlertClose}
          open={open}
          title="Obtener Portafolios"
          textBody={message}
        />
      )} */}
      <Stack spacing={5}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
        >
          <Typography
            variant="h3"
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            {labelListarPortafolios.titulo}
          </Typography>
          {/* <MenuBookIcon sx={{ fontSize: 48 }} /> */}
        </Stack>
        <Stack
          direction={{ sm: "row", xs: "column" }}
          justifyContent={"center"}
          spacing={1}
        >
          <TextField
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ width: { md: 600, xs: "100%" } }}
            onChange={(e) => setSearch(e.currentTarget.value as string)}
            value={search}
          />
          <Select
            onChange={(e) => {
              const selectedValue = JSON.parse(e.target.value);
              if (
                selectedValue.key == undefined ||
                selectedValue.order == undefined
              )
                setOrderBy({});
              else handleRequestSort(selectedValue.key, selectedValue.order);
            }}
            defaultValue={JSON.stringify({ key: undefined, order: undefined })}
          >
            <MenuItem
              value={JSON.stringify({ key: undefined, order: undefined })}
            >
              {labelSelects.noAplicar}
            </MenuItem>
            <MenuItem value={JSON.stringify({ key: "nombre", order: "asc" })}>
              {labelSelects.alfabeticamenteMayor}
            </MenuItem>
            <MenuItem value={JSON.stringify({ key: "nombre", order: "desc" })}>
              {labelSelects.alfabeticamenteMenor}
            </MenuItem>
            <MenuItem value={JSON.stringify({ key: "semestre", order: "asc" })}>
              {labelSelects.semestreMayor}
            </MenuItem>
            <MenuItem
              value={JSON.stringify({ key: "semestre", order: "desc" })}
            >
              {labelSelects.semestreMenor}
            </MenuItem>
          </Select>
        </Stack>
        <Grid2 container spacing={5} display={'flex'} justifyContent={'center'}>
          {usuarios.map((usuario, key) => (
            <Grid2 size={{ xl: 8, xs: 10 }}>
              <PortafolioCard usuario={usuario} key={key} />
            </Grid2>
          ))}
        </Grid2>
      </Stack>
    </>
  );
}

export default ExplorarPortafolios;

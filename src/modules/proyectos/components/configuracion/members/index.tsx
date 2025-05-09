import { ProjectCardAvatar } from "@modules/general/components/projectCardAvatar";
import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSearchUsers } from "@modules/general/hooks/useSearchUsers";
import SearchUsers from "@modules/general/components/searchUsers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@modules/general/context/accountContext";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { adaptUserServiceToCB } from "@modules/usuarios/utils/adapt.usuario";
import { ProyectoSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import AlertDialog from "@modules/general/components/alertDialog";
import { patchEditProjectMembers } from "@modules/proyectos/services/patch.edit.project";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { getCursoById } from "@modules/materias/services/get.curso";
import { UsuarioCurso } from "@modules/materias/types/curso";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";

export const Members = () => {
  const theme = useTheme();

  const { getValues: getValuesProject } = useFormContext<ProyectoSchema>();

  const groupId = getValuesProject("materiaInformacion.cursoId");

  const { selectUser, setSelectUser } = useSearchUsers();

  const { token, id } = useAuth().accountInformation;

  const {
    data: groupInformation,
    error: errorGetGroup,
    isLoading: isLoadingGroupInformation,
  } = useQuery({
    queryFn: () => getCursoById(token, groupId ?? ""),
    queryKey: ["Get Course Information", groupId],
  });

  const [currentMembers, setCurrentMembers] = useState<number[]>([]);

  useEffect(() => {
    if (getValuesProject("integrantes")) {
      setCurrentMembers(getValuesProject("integrantes").map((user) => user.id));
    }
  }, [getValuesProject("integrantes")]);

  useEffect(() => {
    if (errorGetGroup) setError(errorGetGroup);
  }, [errorGetGroup]);

  const { handleAccept, handleClose, isLoading, message, open, title, type, showDialog } =
    useAlertDialog2();

  const { setError } = useErrorReader(showDialog);

  const { mutate: mutateMembers } = useMutation({
    mutationFn: () => patchEditProjectMembers(token, getValuesProject("id") ?? -1, currentMembers),
    mutationKey: ["Change Members of Project", selectUser?.id],
    onSuccess: () => {
      handleCloseModalAddUsers();
      showDialog({
        message: "Usuario Agregado Correctamente",
        type: "success",
        onAccept: handleClose,
        reload: true,
        title: "Añadir Usuario",
      });
    },
    onError: (error) => {
      setError(error);
    },
  });

  function showConfirmRemoveUser(id: number) {
    showDialog({
      message: "¿Está seguro de eliminar a este usuario?",
      onAccept: () => {
        setCurrentMembers((prev) => {
          const updated = prev.filter((user) => user !== id);
          // Hacemos la mutación dentro del callback de setState,
          // asegurando que `currentMembers` ya está actualizado
          mutateMembers(undefined, {
            onSuccess: () => {
              handleCloseModalAddUsers();
              showDialog({
                message: "Usuario Eliminado Correctamente",
                type: "success",
                onAccept: handleClose,
                reload: true,
                title: "Eliminar Usuario",
              });
            },
          });
          return updated;
        });
      },
      onCancel: () => {},
      isLoading: false,
      reload: false,
      title: "Eliminar Usuario",
    });
  }

  function showConfirmAddUser(id: number) {
    showDialog({
      message: "¿Está seguro de Agregado a este usuario?",
      onAccept: () => {
        setCurrentMembers((prev) => {
          const updated = [...prev, id];
          mutateMembers(undefined, {
            onSuccess: () => {
              handleCloseModalAddUsers();
              showDialog({
                message: "Usuario Agregado Correctamente",
                type: "success",
                onAccept: handleClose,
                reload: true,
                title: "Agregar Usuario",
              });
            },
          });
          return updated;
        });
      },
      onCancel: () => {},
      isLoading: false,
      reload: false,
      title: "Agregar Usuario",
    });
  }

  const {
    handleClose: handleCloseModalAddUsers,
    handleOpen: handleOpenModalAddUsers,
    open: openModalAddUsers,
  } = useAlertDialog();

  const filterUsers = useMemo(() => {
    const _users = (groupInformation?.estudiantes || []).filter((user) => {
      let flag = false;
      getValuesProject("integrantes").forEach((u) => {
        if (u.id == user.id) {
          flag = true;
          return;
        }
      });
      return !flag;
    });
    return _users.map((user) => adaptUserServiceToCB(user));
  }, [groupInformation]);

  const RegisterStudent = useMemo(() => {
    return (
      <Stack>
        <SearchUsers
          selectUser={selectUser}
          setSelectUser={setSelectUser}
          users={filterUsers}
          loading={isLoadingGroupInformation}
        />
      </Stack>
    );
  }, [groupInformation]);

  return (
    <Stack spacing={0}>
      <AlertDialog
        handleAccept={() => showConfirmAddUser(selectUser?.id ?? -1)}
        handleCancel={handleCloseModalAddUsers}
        open={openModalAddUsers}
        body={RegisterStudent}
        title="Agregar Integrante"
      />
      <AlertDialog
        handleAccept={handleAccept}
        type={type}
        open={open}
        title={title}
        isLoading={isLoading}
        handleCancel={handleClose}
        textBody={message}
      />
      <Stack>
        <Stack marginBottom={2} direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h5">{labelConfiguracion.colaboradores}</Typography>
          <Button variant="contained" size="small" onClick={handleOpenModalAddUsers}>
            {labelConfiguracion.invitarIntegrantes}
          </Button>
        </Stack>
        <Typography variant="body1" marginBottom={3}>
          {labelConfiguracion.colaboradoresParrafo}
        </Typography>
        <Divider />
      </Stack>
      <Divider />
      <Box sx={{ padding: 2, backgroundColor: theme.palette.action.hover }}>
        <TextField size="small" placeholder={labelConfiguracion.filtrarColaboradores} />
      </Box>
      <Divider />
      <Typography padding={2}>{labelConfiguracion.cuenta}</Typography>
      <Divider />
      {getValuesProject("propietario") && (
        <CardMember member={getValuesProject("propietario")!!} isOwner={true} editable={false} />
      )}
      <Divider />
      {getValuesProject("integrantes").map((user, key) => {
        return (
          <>
            <CardMember
              member={user}
              key={key}
              isMe={user.id == id}
              onClickRemove={() => showConfirmRemoveUser(user.id)}
              editable={true}
            />
            <Divider />
          </>
        );
      })}
    </Stack>
  );
};

type CardMemberProps = {
  member: UsuarioCurso;
  isOwner?: boolean;
  isMe?: boolean;
  editable?: boolean;
  onClickRemove?: () => void;
};
const CardMember: React.FC<CardMemberProps> = ({
  member,
  isOwner,
  isMe,
  editable,
  onClickRemove,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      direction={"row"}
      spacing={1}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={2}
    >
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <ProjectCardAvatar
          usuario={{ foto: member.imagen || "", id: member.id.toString(), nombres: member.nombre }}
          sx={{ width: 48, height: 48 }}
        />
        <Typography variant="h6">{member.nombre}</Typography>
        {isMe && <Chip color="primary" label={labelConfiguracion.eresTu} />}
        {isOwner && <Chip color="secondary" label={labelConfiguracion.propietario} />}
      </Stack>
      {editable && (
        <Stack>
          <Tooltip title={labelConfiguracion.opciones} placement="top">
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <ActionButton
                mode={actionButtonTypes.eliminar}
                onClick={() => {
                  onClickRemove?.();
                }}
              />
            </MenuItem>
          </Menu>
        </Stack>
      )}
    </Stack>
  );
};

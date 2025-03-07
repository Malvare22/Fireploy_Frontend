import Modal, { useModal } from "@modules/general/components/modal";
import CustomInput from "@modules/general/components/customInput";
import Label from "@modules/general/components/label";
import Row from "@modules/general/components/row";

import { LabelUsuario } from "@modules/usuarios/enum/LabelUsuario";
import { Box, Card, MenuItem, SxProps } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Usuario } from "@modules/usuarios/types/usuario";
import CustomSelect from "@modules/general/components/customSelect";
import {
  obtenerEstadoUsuario,
  obtenerTiposUsuario,
} from "@modules/usuarios/utils/usuario.map";
import { useForm } from "react-hook-form";
import { UsuarioSchema } from "@modules/usuarios/utils/form/usuario.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import PreviewImage, {
  usePreviewImage,
} from "@modules/general/components/previewImage";
import { obtenerFechaActual } from "@modules/general/utils/fechas";
import BotonesBasicos from "@modules/general/components/botonesBasicos";
import RedSocial from "@modules/proyectos/components/redSocial";
import { UsuarioEditarDefaultSchema } from "@modules/usuarios/utils/form/usuario.editar.default.schema";
import { AccountContext } from "@modules/general/context/accountContext";
import { modificarUsuario } from "@modules/usuarios/services/modificarUsuario";
import CustomTextArea from "@modules/general/components/customTextArea";
import { LabelDialog } from "@modules/general/enums/LabelDialog";
import useSnackBar from "@modules/general/hooks/useSnackbar";
import SnackBar from "@modules/general/components/snackbar";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import AlertDialog from "@modules/general/components/alertDialog";

type Props = {
  open: boolean;
  handleClose: () => void;
  tipo: "editar" | "crear";
  usuario: Usuario;
};

const ModalUsuario: React.FC<Props> = ({
  open,
  handleClose,
  usuario,
  tipo,
}) => {
  return (
    <Modal
      handleClose={handleClose}
      titulo={tipo == "crear" ? "Crear Usuario" : "Editar Usuario"}
      iconoTitulo={<EditIcon />}
      sx={{ width: { md: 900, xs: 380 } }}
      open={open}
    >
      <Cuerpo
        defaultValue={usuario}
        handleClose={handleClose}
        tipo={tipo}
      ></Cuerpo>
    </Modal>
  );
};

const Cuerpo: React.FC<{
  defaultValue: Usuario;
  handleClose: () => void;
  tipo: "crear" | "editar";
}> = ({ defaultValue, handleClose, tipo }) => {
  const { image, setImage } = usePreviewImage();

  const token = useContext(AccountContext)?.localUser?.token;

  const resolver = () => {
    if (tipo == "crear") {
      return UsuarioSchema;
    }
    return UsuarioEditarDefaultSchema;
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Usuario>({
    defaultValues: defaultValue,
    resolver: zodResolver(resolver()),
  });

  console.log(errors);

  const { open, setOpen, defaultTitle, message, setMessage } = useAlertDialog();

  const query = async (data: Usuario) => {
    const editar = async () => {
      if (token) {
        const response = await modificarUsuario(getValues().id, token, data);
        if (response.error) {
          setMessage(LabelDialog.seHaPresentadoUnError + response.error);
          setOpen(true);
          // setLoader(true);
        } else {
          setMessage(LabelDialog.guardadoExitoso);
          setOpen(true);
          // setLoader(true);
        }
      }
    };

    if (tipo == "editar") await editar();
  };

  useEffect(() => {
    setImage(getValues().fotoDePerfil);
  }, []);

  useEffect(() => {
    if (image != "") {
      setValue("fotoDePerfil", image);
    } else setValue("fotoDePerfil", getValues().fotoDePerfil);
  }, [image]);

  const styleRowRedSocial = {
    flexDirection: "row",
    alignItems: "center",
  } as SxProps;

  const ref = useRef<HTMLButtonElement>(null);

  const handleQuery = () => {
    if (ref) {
      ref.current?.click();
    }
  };

  return (
    <>
      <AlertDialog
        open={open}
        titulo={defaultTitle}
        cuerpo={message}
        setOpen={setOpen}
        reloader={true}
      />

      <form onSubmit={handleSubmit(query)}>
        <Box
          component={"button"}
          onClick={handleQuery}
          type="submit"
          sx={{ display: "none" }}
          ref={ref}
        ></Box>
        <Card
          sx={{
            padding: 4,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Foto de perfil */}
          <Row>
            <Label>{LabelUsuario.fotoPerfil}</Label>
            <PreviewImage image={image} setImage={setImage} />
          </Row>

          {/* Correo */}
          {/* <Row>
          <Label>{LabelUsuario.correo}</Label>
          <Box sx={{ width: "100%" }}>
            <CustomInput
              variant="secondary"
              {...register("correo")} // Registrar el campo
              errorMessage={errors.correo?.message} // Mensaje de error
            />
          </Box>
        </Row> */}

          {/* Código */}
          {/* <Row>
          <Label>{LabelUsuario.codigo}</Label>
          <CustomInput
            variant="secondary"
            {...register("id")} // Registrar el campo
            errorMessage={errors.id?.message} // Mensaje de error
          />
        </Row> */}

          {/* Nombres */}
          <Row>
            <Label>{LabelUsuario.nombres}</Label>
            <CustomInput
              variant="secondary"
              {...register("nombres")}
              errorMessage={errors.nombres?.message} // Mensaje de error
            />
          </Row>

          {/* Apellidos */}
          <Row>
            <Label>{LabelUsuario.apellidos}</Label>
            <CustomInput
              variant="secondary"
              {...register("apellidos")}
              errorMessage={errors.apellidos?.message} // Mensaje de error
            />
          </Row>

          {/* Rol */}
          {/* <Row>
          <Label>{LabelUsuario.rol}</Label>
          <CustomSelect
            variantDelta="secondary"
            {...register("tipo")}
            defaultValue={getValues().tipo}
            errorMessage={errors.tipo?.message} // Mensaje de error
          >
            {Array.from(obtenerTiposUsuario.entries()).map(([valor, texto]) => (
              <MenuItem key={valor} value={valor}>
                {texto}
              </MenuItem>
            ))}
          </CustomSelect>
        </Row> */}

          {/* Estado */}
          {/* <Row>
          <Label>{LabelUsuario.estado}</Label>
          <CustomSelect
            variantDelta="secondary"
            {...register("estado")}
            defaultValue={getValues().estado}
            errorMessage={errors.estado?.message} // Mensaje de error
          >
            {Array.from(obtenerEstadoUsuario.entries()).map(
              ([valor, texto]) => (
                <MenuItem key={valor} value={valor}>
                  {texto}
                </MenuItem>
              )
            )}
          </CustomSelect>
        </Row> */}

          {/* Fecha de nacimiento */}
          <Row>
            <Label>{LabelUsuario.fechaNacimiento}</Label>
            <CustomInput
              variant="secondary"
              type="date"
              errorMessage={errors.fechaDeNacimiento?.message}
              inputProps={{ max: obtenerFechaActual() }}
              {...register("fechaDeNacimiento")}
            />
          </Row>

          {/* Redes sociales */}
          <Row sx={{ alignItems: "start" }}>
            <Label>{LabelUsuario.redesSociales}</Label>
            <Box
              sx={{
                width: "100%",
                border: { md: "solid 1px rgba(0,0,0, .2)" },
                padding: { md: 2 },
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Row sx={styleRowRedSocial}>
                <RedSocial nombre={"linkedin"} />
                <CustomInput
                  variant="secondary"
                  {...register("redSocial.linkedin")}
                  errorMessage={errors.redSocial?.linkedin?.message}
                ></CustomInput>
              </Row>
              <Row sx={styleRowRedSocial}>
                <RedSocial nombre={"facebook"} />
                <CustomInput
                  variant="secondary"
                  {...register("redSocial.facebook")}
                  errorMessage={errors.redSocial?.facebook?.message}
                ></CustomInput>
              </Row>
              <Row sx={styleRowRedSocial}>
                <RedSocial nombre={"instagram"} />
                <CustomInput
                  variant="secondary"
                  {...register("redSocial.instagram")}
                  errorMessage={errors.redSocial?.instagram?.message}
                ></CustomInput>
              </Row>
              <Row sx={styleRowRedSocial}>
                <RedSocial nombre={"x"} />
                <CustomInput
                  variant="secondary"
                  {...register("redSocial.x")}
                  errorMessage={errors.redSocial?.x?.message}
                ></CustomInput>
              </Row>
            </Box>
          </Row>

          {/* Descripción */}
          <Row>
            <Label>{LabelUsuario.descripcion}</Label>
            <CustomTextArea
              {...register("descripcion")}
              errorMessage={errors.descripcion?.message} // Mensaje de error
            />
          </Row>

          {/* Contraseña */}
          {/* <Row>
          <Label>{LabelUsuario.contrasenia}</Label>
          <CustomInput
            variant="secondary"
            {...register("contrasenia")}
            type="password"
            errorMessage={errors.contrasenia?.message} // Mensaje de error
          />
        </Row> */}

          {/* Botones */}
          <BotonesBasicos cancelar={handleClose} aceptar={handleQuery} />
        </Card>
      </form>
    </>
  );
};

export default ModalUsuario;

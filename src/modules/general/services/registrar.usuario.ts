import { postData } from "@core/services";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { Usuario, UsuarioRegistro } from "@modules/usuarios/types/usuario";
import { adaptarUsuarioSalida } from "@modules/usuarios/utils/adaptar.usuario";

export const registrarUsuarioService = async (
  data: UsuarioRegistro
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmarContrasenia, ...usuario } = data;
  const response = await postData<UsuarioService>(
    `/usuario`,
    adaptarUsuarioSalida("crear", usuario as Usuario),
  );

  return response;
};

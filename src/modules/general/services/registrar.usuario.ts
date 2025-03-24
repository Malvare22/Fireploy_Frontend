import { postData } from "@core/services";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adaptarUsuarioSalida } from "@modules/usuarios/utils/adaptar.usuario";
import { UsuarioRegistro } from "@modules/usuarios/utils/form/registro.schema";

export const registrarUsuarioService = async (
  data: UsuarioRegistro
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _data = adaptarUsuarioSalida('crear', data);
  console.log(_data)
  const response = await postData<UsuarioService>(
    `/usuario`,
    _data
  );

  return response;
};

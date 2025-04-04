// import { postData } from "@core/services";

import { postData } from "@core/services";
import { UserTypeFullString } from "@modules/usuarios/utils/usuario.map";

export type SignUpResponse = {
  access_token: string;
  nombre: string;
  tipo: UserTypeFullString;
  foto: string;
  id: number;
};

export const postSignUp = async (email: string, contrasenia: string) => {
  const data = { username: email, password: contrasenia };
  
  const response = await postData<SignUpResponse>("/auth/login", data);
  return response;
};

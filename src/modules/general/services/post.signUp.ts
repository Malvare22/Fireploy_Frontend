import { postData } from "@core/services";
import { UserTypeFullString } from "@modules/usuarios/utils/usuario.map";

/**
 * Represents the structure of the response received after a successful sign-in.
 *
 * @typedef {Object} SignUpResponse
 * @property {string} access_token - The access token for the authenticated session.
 * @property {string} nombre - The full name of the user.
 * @property {UserTypeFullString} tipo - The user's role or type.
 * @property {string} foto - The URL or path to the user's profile picture.
 * @property {number} id - The unique identifier of the user.
 */
export type SignUpResponse = {
  access_token: string;
  nombre: string;
  tipo: UserTypeFullString;
  foto: string;
  id: number;
  googleRegister?: boolean;
};

/**
 * Sends login credentials to the authentication API and retrieves an access token upon success.
 *
 * @async
 * @function postSignUp
 * @param {string} email - The user's email address.
 * @param {string} contrasenia - The user's password.
 * @returns {Promise<SignUpResponse>} The response object containing user info and token.
 */
export const postSignUp = async (email: string, contrasenia: string) => {
  const data = { username: email, password: contrasenia };

  const response = await postData<SignUpResponse>("/auth/login", data);
  return response;
};

export const postSignUpWithGoogle = async (idToken: string) => {
  const data = { idToken: idToken };

  const response = await postData<SignUpResponse & { message: string }>("/auth/loginGoogle", data);

  return response;
};

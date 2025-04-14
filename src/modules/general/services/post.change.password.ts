// import { postData } from "@core/services";

import { postData } from "@core/services";

/**
 * Represents the data required to change a forgotten password.
 * 
 * @typedef {Object} data
 * @property {string} correo - The user's email address.
 * @property {string} contrasenia - The current password.
 * @property {string} nuevaContrasenia - The new password to be set.
 */
export type data = {
  correo: string;
  contrasenia: string;
  nuevaContrasenia: string;
};

/**
 * Sends a request to change the user's password using a recovery token.
 *
 * @async
 * @function postChangePasswordForget
 * @param {data} data - Object containing email, current password, and new password.
 * @param {string} token - Password recovery token.
 * @returns {Promise<string>} The response from the server.
 */
export const postChangePasswordForget = async (data: data, token: string) => {
  const response = await postData<string>(`/auth/changePassword/${token}`, data, {
    sessiontoken: token,
  });
  return response;
};


/**
 * Sends a request to change the user's password using a recovery token.
 *
 * @async
 * @function postChangePasswordForget
 * @param {data} data - Object containing email, current password, and new password.
 * @param {string} token - Password recovery token.
 * @returns {Promise<string>} The response from the server.
 */
export const postChangePassword = async (data: data, token: string) => {
  const response = await postData<string>(`/auth/updatePassword`, data, {
    sessiontoken: token,
  });
  return response;
};

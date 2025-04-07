// import { postData } from "@core/services";

import { postData } from "@core/services";

/**
 * Represents the payload for sending a recovery email.
 * 
 * @typedef {Object} postSendEmail
 * @property {string} email - The user's email address to send the recovery link to.
 */
export type postSendEmail = {
  email: string;
};

/**
 * Sends a password recovery email to the provided address.
 *
 * @async
 * @function postSendEmail
 * @param {string} email - The email address to send the recovery instructions to.
 * @returns {Promise<string>} The response from the server.
 */
export const postSendEmail = async (email: string) => {
  const data = { correo: email };
  
  const response = await postData<string>("/auth/recover", data);
  return response;
};

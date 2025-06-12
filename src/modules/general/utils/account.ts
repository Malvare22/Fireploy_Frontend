import { VARIABLES_LOCAL_STORAGE } from "../enums/variablesLocalStorage";
import { SignUpResponse } from "../services/post.signUp";

/**
 * loginUser – Stores authentication data in local storage after a successful login or sign-up.
 *
 * This function saves the user's access token and user ID to the browser's local storage,
 * allowing persistent authentication across sessions.
 *
 * @function
 *
 * @param data - An object containing the user's authentication details,
 * including:
 * - `access_token`: The token received after authentication.
 * - `id`: The unique identifier of the authenticated user.
 *
 * @returns void
 *
 * @example
 * ```ts
 * loginUser({ access_token: "abc123", id: 42 });
 * ```
 */
  export const loginUser = (data: SignUpResponse) => {
    localStorage.setItem(VARIABLES_LOCAL_STORAGE.TOKEN, data.access_token);
    localStorage.setItem(VARIABLES_LOCAL_STORAGE.CURRENT_ID, data.id.toString());
  };
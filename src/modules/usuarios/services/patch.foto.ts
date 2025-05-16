import { patchData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";

/**
 * Updates the profile photo of a user by sending a PATCH request to the server.
 * 
 * This function sends a PATCH request to update a user's profile picture. It takes the user's ID, 
 * a session token for authentication, and the image file to be uploaded. The image is sent as 
 * FormData to the server.
 * 
 * @param {string} token - The session token used for authenticating the API request.
 * @param {number} id - The ID of the user whose photo is being updated.
 * @param {Blob} imgFile - The image file to be uploaded as the user's new profile photo.
 * 
 * @returns {Promise<UsuarioService>} A promise that resolves to the updated user data returned from the server.
 * 
 * @example
 * ```tsx
 * const updatedUser = await patchUpdatePhotoService('your-session-token', 123, selectedImage);
 * ```
 */
export const patchUpdatePhotoService = async (
  token: string,
  id: number,
  imgFile: Blob
) => {
  const formData = new FormData();

  formData.append("image", imgFile, `${id}.png`);

  const response = await patchData<UsuarioService>(
    `/usuario/image/${id}`,
    formData,
    {
      sessiontoken: token,
    }
  );

  return response;
};

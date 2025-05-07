import { getData } from "@core/services";
import { DataBaseService } from "../types/dabase.service";

/**
 * getDataBaseById function – Fetches the database details by the specified ID.
 * 
 * This function sends a request to fetch a database record based on its ID. The request is 
 * authenticated with the provided session token.
 * 
 * @param {number} id - The ID of the database to fetch.
 * @param {string} token - The session token used for authentication.
 * 
 * @returns {Promise<DataBaseService | null>} A promise that resolves to the database record if found,
 *                                            or `null` if the database is not found.
 */
export const getDataBaseById = async (id: number, token: string) => {
  const response = await getData<DataBaseService | null>(
    `/base-de-datos/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};

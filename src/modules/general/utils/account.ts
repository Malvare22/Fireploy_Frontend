import { VARIABLES_LOCAL_STORAGE } from "../enums/variablesLocalStorage";
import { SignUpResponse } from "../services/post.signUp";

  export const loginUser = (data: SignUpResponse) => {
    localStorage.setItem(VARIABLES_LOCAL_STORAGE.TOKEN, data.access_token);
    localStorage.setItem(VARIABLES_LOCAL_STORAGE.CURRENT_ID, data.id.toString());
  };
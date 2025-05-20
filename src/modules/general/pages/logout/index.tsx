import { accountInformationTemplate, useAuth } from "@modules/general/context/accountContext";
import { rutasGeneral } from "@modules/general/router/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router";

/**
 * Component that handles user logout logic.
 * Clears local storage, resets account information,
 * and redirects the user to the login page.
 *
 * @component
 */
function Logout() {
  const navigate = useNavigate();

  const { setAccountInformation } = useAuth();

  /**
   * Executes the logout process when the component mounts.
   * - Clears the localStorage.
   * - Resets the user context to the default template.
   * - Navigates to the login route.
   */
  useEffect(() => {
    localStorage.clear();
    setAccountInformation(accountInformationTemplate);
    navigate(rutasGeneral.login);
  }, []);

  return <></>;
}

export default Logout;

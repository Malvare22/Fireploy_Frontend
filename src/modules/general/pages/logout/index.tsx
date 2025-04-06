import { accountInformationTemplate, useAuth } from "@modules/general/context/accountContext";
import { rutasGeneral } from "@modules/general/router/router";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Logout() {
  const navigate = useNavigate();

  const {setAccountInformation} = useAuth();

  useEffect(() => {
    localStorage.clear();
    setAccountInformation(accountInformationTemplate);
    navigate(rutasGeneral.login);
  }, []);

  return <></>;
}

export default Logout;

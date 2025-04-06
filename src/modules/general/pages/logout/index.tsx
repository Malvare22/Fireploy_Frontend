import { accountInformationTemplate, useAuth } from "@modules/general/context/accountContext";
import { rutasGeneral } from "@modules/general/router/router";
import { Typography } from "@mui/material";
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

  return <Typography>AAAs</Typography>;
}

export default Logout;

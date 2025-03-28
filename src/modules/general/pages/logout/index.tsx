import { AccountContext } from "@modules/general/context/accountContext";
import { rutasGeneral } from "@modules/general/router/router";
import { Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

function Logout() {
  const navigate = useNavigate();

  const { setLocalUser } = useContext(AccountContext);

  useEffect(() => {
    localStorage.clear();
    setLocalUser!!(null);
    navigate(rutasGeneral.login);
  }, []);

  return <Typography>AAAs</Typography>;
}

export default Logout;

import Menu from "@modules/general/components/menu";
import { AccountContext } from "@modules/general/context/accountContext";
import { useContext } from "react";

function Dashboard() {

  const {localUser} = useContext(AccountContext);

  return <Menu type={localUser?.tipo}/>;
}

export default Dashboard;

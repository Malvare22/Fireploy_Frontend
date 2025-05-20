import { AlertDialogProvider } from "@modules/general/context/alertDialogContext";
import Portafolio from "@modules/usuarios/components/portafolio";
import { useParams } from "react-router";

function PortafolioView() {
  const { id } = useParams();

  return <AlertDialogProvider>{id && <Portafolio id={parseInt(id)} />}</AlertDialogProvider>;
}

export default PortafolioView;

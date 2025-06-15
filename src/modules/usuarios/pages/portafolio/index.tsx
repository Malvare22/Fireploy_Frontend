import { AlertDialogProvider } from "@modules/general/context/alertDialogContext";
import Portafolio from "@modules/usuarios/components/portafolio";
import { useParams } from "react-router";

/**
 * `PortafolioView` – React component that displays a user's portfolio based on the route parameter.
 *
 * This component wraps the `Portafolio` component with an `AlertDialogProvider` context,
 * and only renders the portfolio if a valid `id` is present in the URL parameters.
 *
 * @component
 *
 * @returns {JSX.Element} A portfolio view wrapped in an alert dialog context.
 *
 * @example
 * ```tsx
 * // With route: /usuarios/portafolio/123
 * <PortafolioView />
 * ```
 */
function PortafolioView() {
  const { id } = useParams();

  return <AlertDialogProvider>{id && <Portafolio id={parseInt(id)} />}</AlertDialogProvider>;
}

export default PortafolioView;

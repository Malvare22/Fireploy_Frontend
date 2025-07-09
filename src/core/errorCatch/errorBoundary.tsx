import ErrorPage from "@modules/general/pages/404";
import { useRouteError } from "react-router-dom";

export default function ErrorElement() {
  const error = useRouteError() as any;

  return <ErrorPage errorMessage={error.message ?? undefined} />;
}

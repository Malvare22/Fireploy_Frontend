import AlertDialog from "@modules/general/components/alertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import RepositoryCard from "@modules/proyectos/components/cardRepository";
import { labelRepositorios } from "@modules/proyectos/enum/labelRepositorios";
import { getProjectByUserId } from "@modules/proyectos/services/get.project";
import { Repositorio } from "@modules/proyectos/types/repositorio";
import { adaptRepository } from "@modules/proyectos/utils/adapt.proyecto";
import { Divider, Grid2, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function VistaRepositorios() {
  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog();

  const { token, id } = useAuth().accountInformation;

  const { setError } = useErrorReader(showDialog);

  const {
    isLoading,
    error,
    data: repositorios = [],
  } = useQuery({
    queryKey: ["Repositories by Users"],
    queryFn: async () => {
      const projects = await getProjectByUserId(token, id);
      const repos: Repositorio[] = [];
      if (projects) {
        for (const project of projects) {
          for (const repo of project.repositorios) {
            repos.push(adaptRepository(repo));
          }
        }
      }
      return repos;
    },
  });

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  // const [buffer, setBuffer] = useState(repositorios ?? []);

  // c

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />
      <>
        {isLoading ? (
          <LoaderElement />
        ) : (
          <Stack spacing={3}>
            <Stack>
              <Typography variant="h4">{labelRepositorios.titulo}</Typography>
              <Divider />
            </Stack>
            <Grid2 container justifyContent={"center"} rowSpacing={3}>
              {repositorios.map((repo) => (
                <Grid2 size={{ md: 8, xs: 12 }}>
                  <RepositoryCard repositorio={repo} key={repo.id} />
                </Grid2>
              ))}
            </Grid2>
          </Stack>
        )}
      </>
    </>
  );
}

export default VistaRepositorios;

import { Alert, Box, Stack } from "@mui/material";
import TablaEstudiantesEditarCurso from "../tablaEstudiantesEditarCurso";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";

function GestionarEstudiantesCurso() {
  return (
    
        <>
          <Stack spacing={2}>
            {!curso?.estudiantes || curso.estudiantes.length != 0 ? (
              <TablaEstudiantesEditarCurso
                estudiante={curso?.estudiantes || []}
                setSelectUsers={setSelectStudentsToRemove}
              />
            ) : (
              <Alert severity="warning">{labelEditarCurso.noHayEstudiantes}</Alert>
            )}

            <Stack alignItems="end">
              <Box>
                <GeneralButton
                  color="error"
                  mode={buttonTypes.remove}
                  disabled={selectStudentsToRemove.length == 0}
                  onClick={handleOpenRemoveStudents}
                />
                <GeneralButton mode={buttonTypes.add} onClick={handleOpen} />
              </Box>
            </Stack>
          </Stack>
      )}</>
  )
}

export default GestionarEstudiantesCurso
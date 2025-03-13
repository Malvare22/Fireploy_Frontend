import AccordionUsage from "@modules/general/components/accordionUsage";
import ActionButton from "@modules/general/components/actionButton";
import CustomTextArea from "@modules/general/components/customTextArea";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { LabelCurso } from "@modules/materias/enums/labelCurso";
import {
  SeccionCurso,
} from "@modules/materias/types/curso.seccion";
import { proyectosPrueba } from "@modules/proyectos/test/datos/proyectos.prueba";
import { CardProyecto } from "@modules/usuarios/components/portafolio";
import { Box, Card, Divider, Typography } from "@mui/material";

type SeccionesProps = {
  secciones: SeccionCurso[];
};
const Secciones: React.FC<SeccionesProps> = ({
  secciones
}) => {
  return (
    <Box>
      <Typography variant="h3Bold">{LabelCurso.secciones}</Typography>
      <Divider />
      <Box>
        {secciones.map((seccion, key) => (
          <AccordionUsage
            key={key}
            title={<Typography variant="h4">{seccion.titulo}</Typography>}
          >
            <Seccion seccion={seccion} key={key} />
          </AccordionUsage>
        ))}
      </Box>
    </Box>
  );
};

type SeccionProps = {
  seccion: SeccionCurso;
};
const Seccion: React.FC<SeccionProps> = ({ seccion }) => {
  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <CustomTextArea value={seccion.descripcion} disabled={true} />
        <ActionButton mode={actionButtonTypes.editar} />
      </Box>
      <Divider />
      <Box>
        {proyectosPrueba.map((proyecto, key) => (
          <Card sx={{ border: "1px solid black" }}>
            <CardProyecto proyecto={proyecto} tipo="básico" key={key} />
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Secciones;

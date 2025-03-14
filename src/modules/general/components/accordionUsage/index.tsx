import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode } from "react";

/**
 * @typedef Props
 * @property {ReactNode} title - Título del acordeón que se muestra en el resumen.
 * @property {ReactNode} children - Contenido del acordeón que se muestra al expandirlo.
 */
type Props = {
  title: ReactNode;
  children: ReactNode;
};

/**
 * Componente reutilizable de acordeón que muestra un título y su contenido al expandirse.
 * 
 * @component
 * @param {Props} props - Propiedades del componente.
 * @param {ReactNode} props.title - Título del acordeón.
 * @param {ReactNode} props.children - Contenido del acordeón.
 * @returns {JSX.Element} Un acordeón interactivo con un título y contenido oculto que se expande al hacer clic.
 */
const AccordionUsage: React.FC<Props> = ({ children, title }: Props) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {title}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionUsage;

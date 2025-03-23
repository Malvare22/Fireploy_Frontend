import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode } from "react";

/**
 * @typedef Props
 * @property {ReactNode} title - Título del acordeón que se muestra en el resumen.
 * @property {ReactNode} children - Contenido del acordeón que se muestra al expandirlo.
 * @property {boolean} [defaultExpanded] - Si el acordeón debe estar expandido por defecto.
 * @property {boolean} [disabled] - Si el acordeón debe estar deshabilitado.
 * @property {boolean} [disableGutters] - Si el acordeón debe eliminar los márgenes.
 * @property {boolean} [square] - Si el acordeón debe tener bordes cuadrados en lugar de redondeados.
 * @property {string} [className] - Clase CSS opcional para estilos personalizados.
 */
type Props = {
  title: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  square?: boolean;
  className?: string;
};

/**
 * Componente reutilizable de acordeón que muestra un título y su contenido al expandirse.
 * 
 * @component
 * @param {Props} props - Propiedades del componente.
 * @param {ReactNode} props.title - Título del acordeón.
 * @param {ReactNode} props.children - Contenido del acordeón.
 * @param {boolean} [props.defaultExpanded] - Si el acordeón debe estar expandido por defecto.
 * @param {boolean} [props.disabled] - Si el acordeón debe estar deshabilitado.
 * @param {boolean} [props.disableGutters] - Si el acordeón debe eliminar los márgenes.
 * @param {boolean} [props.square] - Si el acordeón debe tener bordes cuadrados en lugar de redondeados.
 * @param {string} [props.className] - Clase CSS opcional para estilos personalizados.
 * @returns {JSX.Element} Un acordeón interactivo con un título y contenido oculto que se expande al hacer clic.
 */
const AccordionUsage: React.FC<Props> = ({ children, title, defaultExpanded, disabled, disableGutters, square, className }: Props) => {
  return (
    <div className={className}>
      <Accordion defaultExpanded={defaultExpanded} disabled={disabled} disableGutters={disableGutters} square={square}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {title}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionUsage;

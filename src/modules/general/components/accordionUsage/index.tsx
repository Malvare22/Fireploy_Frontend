import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode } from "react";

/**
 * Properties for the AccordionUsage component.
 */
type Props = {
  /** Title of the accordion, displayed in the header. */
  title: ReactNode;
  
  /** Content inside the accordion. */
  children: ReactNode;
  
  /** Determines whether the accordion should be expanded by default. */
  defaultExpanded?: boolean;
  
  /** Indicates whether the accordion should be disabled. */
  disabled?: boolean;
  
  /** If true, removes the accordion's default margins. */
  disableGutters?: boolean;
  
  /** If true, the accordion will have square corners instead of rounded ones. */
  square?: boolean;
  
  /** Optional CSS class for styling the accordion container. */
  className?: string;
};

/**
 * Reusable accordion component based on Material-UI.
 * 
 * @param {Props} props - Component properties.
 * @returns {JSX.Element} An interactive accordion component.
 */
const AccordionUsage: React.FC<Props> = ({
  children,
  title,
  defaultExpanded,
  disabled,
  disableGutters,
  square,
  className
}: Props) => {
  return (
    <div className={className}>
      <Accordion
        defaultExpanded={defaultExpanded}
        disabled={disabled}
        disableGutters={disableGutters}
        square={square}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {title}
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionUsage;

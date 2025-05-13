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
 * AccordionUsage component – a reusable and customizable accordion based on Material-UI,
 * used to display collapsible sections with a title and body content.
 * 
 * This component supports default expanded state, disabled mode, gutter removal,
 * square styling, and optional custom CSS classes. It renders custom content through children
 * and provides flexibility for layout and interaction.
 * 
 * @component
 * 
 * @param {React.ReactNode} title - The title displayed in the accordion header.
 * @param {React.ReactNode} children - The content rendered inside the accordion body.
 * @param {boolean} [defaultExpanded=false] - If `true`, the accordion is expanded by default.
 * @param {boolean} [disabled=false] - If `true`, disables the accordion interaction.
 * @param {boolean} [disableGutters=false] - If `true`, removes the default padding.
 * @param {boolean} [square=false] - If `true`, uses square corners instead of rounded.
 * @param {string} [className] - Optional CSS class to style the accordion container.
 * 
 * @returns {JSX.Element} A Material UI Accordion component with customizable content and behavior.
 * 
 * @example
 * ```tsx
 * <AccordionUsage title="Details" defaultExpanded>
 *   <p>This is the accordion content.</p>
 * </AccordionUsage>
 * ```
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

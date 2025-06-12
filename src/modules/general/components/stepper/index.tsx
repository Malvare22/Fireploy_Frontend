import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
  Box,
  StepConnector,
  stepConnectorClasses,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StepContent from "@mui/material/StepContent";

/**
 * Custom connector used to override default MUI styles.
 */
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "black",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "black",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
    ...theme.applyStyles?.("dark", {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

/**
 * Props for StepperStandard component.
 */
type Props = {
  /**
   * The current active step index.
   */
  activeStep: number;

  /**
   * Function to determine if a step has been skipped.
   */
  isStepSkipped: (step: number) => boolean;

  /**
   * Array of label-content pairs for each step.
   */
  contents: [string, React.ReactNode][];
};

/**
 * StepperStandard component – a responsive stepper that switches between horizontal
 * and vertical layout based on screen size. Displays a sequence of steps with labels
 * and their corresponding content.
 * 
 * This component leverages Material-UI's Stepper and StepContent components,
 * and includes a custom connector to match a specific visual style. It supports
 * skipping steps and dynamically highlights the active step.
 * 
 * @component
 * 
 * @param {number} activeStep - The index of the currently active step in the stepper.
 * 
 * @param {Function} isStepSkipped - A function that receives a step index and returns
 * a boolean indicating whether that step should be marked as skipped.
 * 
 * @param {Array} contents - An array of tuples where each tuple contains:
 * a string as the label for the step, and a React node representing the content
 * to be displayed for that step.
 * 
 * @returns {Visual element} A Material-UI Stepper component with responsive layout and
 * optional step content display depending on screen size.
 * 
 * @example
 * ```tsx
 * <StepperStandard
 *   activeStep={1}
 *   isStepSkipped={(step) => step === 0}
 *   contents={[
 *     ["Step 1", <StepOne />],
 *     ["Step 2", <StepTwo />],
 *     ["Step 3", <StepThree />]
 *   ]}
 * />
 * ```
 */

export default function StepperStandard({ activeStep, isStepSkipped, contents }: Props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        orientation={matches ? "horizontal" : "vertical"}
        connector={<QontoConnector />}
      >
        {contents.map(([label, content], index) => {
          const stepProps: { completed?: boolean } = {};
          if (isStepSkipped(index)) stepProps.completed = false;

          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
              {!matches && <StepContent>{content}</StepContent>}
            </Step>
          );
        })}
      </Stepper>

      {matches && (
        <Box sx={{ marginTop: 3 }}>
          {contents.map(([_label, content], index) =>
            index === activeStep ? <Box key={index}>{content}</Box> : null
          )}
        </Box>
      )}
    </Box>
  );
}

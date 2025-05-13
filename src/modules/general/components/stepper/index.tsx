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
 * StepperStandard Component
 *
 * A responsive stepper that adapts between horizontal and vertical orientation based on screen size.
 * Displays step labels and associated content.
 *
 * @component
 * @param {Props} props - Props for the StepperStandard component.
 * @returns {JSX.Element} A stepper with responsive layout and custom styles.
 *
 * @example
 * ```tsx
 * <StepperStandard
 *   activeStep={1}
 *   isStepSkipped={(step) => false}
 *   contents={[
 *     ['Step 1', <StepOneComponent />],
 *     ['Step 2', <StepTwoComponent />],
 *     ['Step 3', <StepThreeComponent />]
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

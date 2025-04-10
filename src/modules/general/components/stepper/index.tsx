import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box, StepConnector, stepConnectorClasses, styled, useMediaQuery, useTheme } from "@mui/material";
import StepContent from "@mui/material/StepContent";

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
    ...theme.applyStyles("dark", {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

type Props = {
  activeStep: number;
  isStepSkipped: (step: number) => boolean;
  contents: [string, React.ReactNode][];
};

export default function StepperStandard({ activeStep, isStepSkipped, contents }: Props) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} orientation={matches ? 'horizontal' : 'vertical'} connector={<QontoConnector />}>
        {contents.map(([label, content], index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
              {!matches && <StepContent>{content}</StepContent>}
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{marginTop: 3}}>
      {matches && contents.map(([_label, content], index) => {
        return index == activeStep && <Box>{content}</Box>
      })}
      </Box>
    </Box>
  );
}

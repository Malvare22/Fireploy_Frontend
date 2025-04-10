import { useState } from "react";

export const useStepper = (initialStep: number = 0) => {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepSkipped = (step: number) => skipped.has(step);

  const skipStep = (step: number) => {
    setSkipped((prev) => new Set(prev).add(step));
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  return {
    activeStep,
    setActiveStep,
    skipped,
    isStepSkipped,
    skipStep,
    handleNext
  };
};

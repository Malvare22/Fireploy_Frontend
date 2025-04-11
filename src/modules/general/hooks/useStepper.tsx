import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useStepper = (initialStep: number = 0) => {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepSkipped = (step: number) => skipped.has(step);

  const [searchParams, setSearchParams] = useSearchParams();

  const skipStep = (step: number) => {
    setSkipped((prev) => new Set(prev).add(step));
  };

  useEffect(() => {
    let nStage = 1;
    if (searchParams.get("stage")) {
      nStage = parseInt(searchParams.get("stage") || "1");
    } else {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("stage", '1');
        return params;
      });
    }
    setActiveStep(nStage - 1);
  }, [searchParams]);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("stage", ((activeStep + 1) + 1).toString());
      return params;
    });
  };

  return {
    activeStep,
    setActiveStep,
    skipped,
    isStepSkipped,
    skipStep,
    handleNext,
  };
};

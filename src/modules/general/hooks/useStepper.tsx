import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

/**
 * Custom hook to manage stepper logic with support for skipped steps
 * and synchronization with the URL search parameter `stage`.
 *
 * @param {number} [initialStep=0] - The starting step index (0-based).
 * @returns {{
 *   activeStep: number,
 *   setActiveStep: React.Dispatch<React.SetStateAction<number>>,
 *   skipped: Set<number>,
 *   isStepSkipped: (step: number) => boolean,
 *   skipStep: (step: number) => void,
 *   handleNext: () => void
 * }}
 * Object containing stepper state and control functions.
 */
export const useStepper = (initialStep: number = 0) => {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [skipped, setSkipped] = useState(new Set<number>());

  /**
   * Checks if a specific step has been skipped.
   * @param {number} step - The step index to check.
   * @returns {boolean} True if the step was skipped, otherwise false.
   */
  const isStepSkipped = (step: number) => skipped.has(step);

  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Marks a step as skipped.
   * @param {number} step - The step index to skip.
   */
  const skipStep = (step: number) => {
    setSkipped((prev) => new Set(prev).add(step));
  };

  /**
   * Syncs `activeStep` with the `stage` parameter from the URL on mount and whenever it changes.
   */
  useEffect(() => {
    let nStage = 1;
    if (searchParams.get("stage")) {
      nStage = parseInt(searchParams.get("stage") || "1");
    } else {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("stage", "1");
        return params;
      });
    }
    setActiveStep(nStage - 1);
  }, [searchParams]);

  /**
   * Advances to the next step, updating `activeStep`, handling skipped steps,
   * and updating the `stage` URL parameter.
   */
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
      params.set("stage", (activeStep + 1 + 1).toString());
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

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

/**
 * Custom hook to manage stepper logic with support for skipped steps
 * and synchronization with the URL search parameter `stage`.
 *
 * This hook is used to handle step-based navigation, where each step is
 * represented by an index. It allows for skipping steps, keeps track of
 * the current step, and syncs the step state with the URL query parameter `stage`.
 *
 * @param {number} [initialStep=0] - The starting step index (0-based).
 * @returns {{
 *   activeStep: number, // The current active step index (0-based).
 *   setActiveStep: React.Dispatch<React.SetStateAction<number>>, // Function to set the active step.
 *   skipped: Set<number>, // A set of skipped steps' indices.
 *   isStepSkipped: (step: number) => boolean, // Function to check if a specific step was skipped.
 *   skipStep: (step: number) => void, // Function to mark a step as skipped.
 *   handleNext: () => void // Function to move to the next step and update the URL.
 * }}
 * An object containing stepper state and control functions.
 */
export const useStepper = (initialStep: number = 0) => {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [skipped, setSkipped] = useState(new Set<number>());

  /**
   * Checks if a specific step has been skipped.
   *
   * @param {number} step - The step index to check.
   * @returns {boolean} - Returns `true` if the step was skipped, otherwise `false`.
   */
  const isStepSkipped = (step: number) => skipped.has(step);

  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Marks a step as skipped.
   *
   * @param {number} step - The step index to skip.
   */
  const skipStep = (step: number) => {
    setSkipped((prev) => new Set(prev).add(step));
  };

  /**
   * Syncs `activeStep` with the `stage` parameter from the URL on mount
   * and whenever it changes.
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
    activeStep, // The current active step index (0-based).
    setActiveStep, // Function to set the active step.
    skipped, // A set of skipped steps' indices.
    isStepSkipped, // Function to check if a specific step was skipped.
    skipStep, // Function to mark a step as skipped.
    handleNext, // Function to move to the next step and update the URL.
  };
};

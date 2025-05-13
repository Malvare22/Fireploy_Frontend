import { createContext } from "react";

/**
 * Context for managing the state and actions related to a stepper component.
 * This context provides methods to navigate through steps in the stepper.
 * 
 * The context is initialized with a `handleNext` function that can be
 * overridden by a context provider to define custom navigation behavior.
 * 
 * @constant
 * @type {React.Context<{ handleNext: () => void }>}
 */
export const StepperContext = createContext({
  /**
   * Function to move to the next step in the stepper.
   * The actual implementation can be provided by the context provider.
   * 
   * @returns {void}
   */
  handleNext: () => {}
});

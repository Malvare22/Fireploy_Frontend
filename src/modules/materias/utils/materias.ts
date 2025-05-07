import { Materia } from "../types/materia";

/**
 * getMateriasSemestresLabels – Function to generate semester labels for a course.
 * 
 * This function returns an array of pairs, where each pair consists of a semester number and its corresponding label.
 * The labels are based on a predefined set of labels for semesters (e.g., "l", "ll", "lll", etc.).
 * 
 * @returns {Array<[number, string]>} An array of tuples, where the first value is the semester number 
 * and the second is the label for that semester.
 * 
 * @example
 * const labels = getMateriasSemestresLabels();
 * console.log(labels); // [[1, 'l'], [2, 'll'], [3, 'lll'], ...]
 */
export const getMateriasSemestresLabels = () => {
  const labels = ["l", "ll", "lll", "lV", "V", "Vl", "Vll", "Vlll", "lX", "X"];
  return labels.map((label, index) => [index + 1, label] as [number, string]);
};

/**
 * getMateriaStateMap – A Map that stores the possible states for a Materia (course) and their corresponding string values.
 * 
 * This map allows the translation of a course's state (either "A" or "I") into human-readable strings 
 * ("Activo" for active, "Inactivo" for inactive).
 * 
 * @constant
 * @type {Map<Materia["estado"], string>}
 * 
 * @example
 * const state = getMateriaStateMap.get('A'); // "Activo"
 * const inactiveState = getMateriaStateMap.get('I'); // "Inactivo"
 */
const materiaStates: Record<Materia["estado"], string> = {
  A: "Activo",
  I: "Inactivo",
} as const;

export const getMateriaStateMap = new Map(
  Object.entries(materiaStates) as [Materia["estado"], string][]
);

/**
 * getMateriaStatesArray – Function to get the states of a Materia (course) as an array of key-value pairs.
 * 
 * This function returns an array of tuples representing the possible states for a course, with 
 * the state key ("A" or "I") and its corresponding human-readable string ("Activo" or "Inactivo").
 * 
 * @returns {Array<[Materia["estado"], string]>} An array of tuples with each course state and its description.
 * 
 * @example
 * const states = getMateriaStatesArray;
 * console.log(states); // [['A', 'Activo'], ['I', 'Inactivo']]
 */
export const getMateriaStatesArray = (
  Object.entries(materiaStates) as [Materia["estado"], string][]
);

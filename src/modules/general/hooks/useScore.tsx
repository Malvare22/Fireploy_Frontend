import { useState } from "react";

/**
 * Props for the `useScore` hook.
 * @property {number} initalScore - The initial score value to set.
 */
type Props = {
  initalScore: number;
};

/**
 * Custom hook to manage a numeric score value.
 *
 * @param {Props} props - The props object containing the initial score.
 * @returns {{ value: number | null, setValue: React.Dispatch<React.SetStateAction<number | null>> }}
 * An object containing the current score value and a function to update it.
 */
const useScore = ({ initalScore }: Props) => {
  const [value, setValue] = useState<number | null>(initalScore);

  return {
    value,
    setValue,
  };
};

export default useScore;

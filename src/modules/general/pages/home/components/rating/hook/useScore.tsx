import { useState } from "react";

type Props = {
  initalScore: number;
};

const useScore = ({ initalScore }: Props) => {
  const [value, setValue] = useState<number | null>(initalScore);

  return {
    value,
    setValue,
  };
};

export default useScore;

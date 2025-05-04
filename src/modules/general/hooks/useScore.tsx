import { useState } from "react";

function useScore(initialValue?: number) {
  const [value, setValue] = useState<number | null>(!initialValue ? null : initialValue);

  return {
    value,
    setValue,
  };
}

export default useScore;

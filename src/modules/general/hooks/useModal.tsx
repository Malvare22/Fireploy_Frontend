import { useState } from "react";

function useModal() {

  const [view, setView] = useState<boolean>(false);

  return {
    view,
    setView,
  };
}

export default useModal;

import { useState } from "react";

function useSnackBar() {
  const [view, setView] = useState<boolean>(false);

  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState<boolean>(false);

  return {
    view,
    setView,
    message,
    setMessage,
    success,
    setSuccess,
  };
}

export default useSnackBar;
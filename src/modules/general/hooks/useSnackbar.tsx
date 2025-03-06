import { useEffect, useState } from "react";

function useSnackBar() {
  const [view, setView] = useState<boolean>(false);

  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState<boolean>(false);

  const [loader, setLoader] = useState<boolean>(false);

  useEffect(
    () => {
  
      if(loader == false) return;
      setTimeout(() => {
        window.location.reload(); 
      }, 5000);

      setLoader(false);

      
    },
    [loader]
  )

  return {
    view,
    setView,
    message,
    setMessage,
    success,
    setSuccess,
    loader,
    setLoader
  };
}

export default useSnackBar;
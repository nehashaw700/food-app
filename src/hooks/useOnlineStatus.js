import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.navigator.onLine;
  });

  useEffect(() => {
    const handleOnlineStatus = () => setOnlineStatus(true);
    const handleOfflineStatus = () => setOnlineStatus(false);

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOfflineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOfflineStatus);
    };
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;

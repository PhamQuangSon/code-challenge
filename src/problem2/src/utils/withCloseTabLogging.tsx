import React, { useEffect } from "react";

const withCloseTabLogging = (WrappedComponent: React.ComponentType) => {
  const WithCloseTabLogging = (props: any) => {
    useEffect(() => {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        console.log(`Component ${WrappedComponent.name} is being closed`);
        localStorage.removeItem("auth-store");
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithCloseTabLogging;
};

export default withCloseTabLogging;

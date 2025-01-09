import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // or 'next/router' if using Next.js

const withAuthentication = (WrappedComponent: React.ComponentType) => {
  const WithAuthentication = (
    props: React.ComponentProps<typeof WrappedComponent>
  ) => {
    const navigate = useNavigate();

    useEffect(() => {
      const isAuthenticated = checkAuthentication(); // Implement this function to check authentication

      if (!isAuthenticated) {
        navigate("/sign-in"); // Redirect to login page if not authenticated
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthentication;
};

const checkAuthentication = () => {
  // Implement your authentication check logic here
  // For example, check if a token exists in localStorage
  return !!localStorage.getItem("auth-store");
};

export default withAuthentication;

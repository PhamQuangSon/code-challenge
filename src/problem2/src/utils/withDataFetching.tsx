import React, { useEffect, useState } from "react";

import type { TWithDataFetchingArticle } from "@/store/articleStore";
// import axios from "axios"; // Assuming you're using axios for API requests
import axiosInstance from "@/utils/axiosInstance";

const withDataFetching = <P extends TWithDataFetchingArticle>(
  WrappedComponent: React.ComponentType<P>,
  apiUrl: string
) => {
  const WithDataFetchingComponent: React.FC<
    Omit<P, keyof TWithDataFetchingArticle>
  > = (props) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(apiUrl);
          setData(response.data);
          setIsLoading(false);
        } catch (error: any) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, []);

    if (isLoading) {
      return (
        <h2 className="text-center uppercase tracking-widest text-gray-500">
          Loading withDataFetching articles...
        </h2>
      );
    }

    if (error) {
      return (
        <h2 className="text-center uppercase tracking-widest text-gray-500">
          Error: {error.message}
        </h2>
      );
    }

    return (
      <WrappedComponent
        {...(props as P)}
        data={data}
        isLoading={isLoading}
        error={error}
      />
    );
  };

  return WithDataFetchingComponent;
};

export default withDataFetching;

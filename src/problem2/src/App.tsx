import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Message from "@/components/Message";
import { useThemeStore } from "@/store/themeStore";
import withCloseTabLogging from "@/utils/withCloseTabLogging";
import withLayout from "@/utils/withLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-quill/dist/quill.snow.css";

const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const Home = lazy(() => import("@/pages/Home"));

const queryClient = new QueryClient();

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Message text="Loading app..." />}>
        <Routes>
          <Route path="/" element={<Home />} key="Home" />
          <Route path="*" element={<ErrorPage />} key="Error" />
        </Routes>
        <ToastContainer stacked />
      </Suspense>
    </QueryClientProvider>
  );
}

export default withCloseTabLogging(withLayout(App));

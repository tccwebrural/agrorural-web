import React, { createContext, ReactNode, useContext, useState } from "react";

type LoadingContext = {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

const loadingProvider = (): LoadingContext => {
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };
  const stopLoading = () => {
    setLoading(false);
  };
  return { loading, startLoading, stopLoading };
};

const loadingContext = createContext<LoadingContext | {}>({});
const useGlobalLoading = () => {
  return useContext(loadingContext) as LoadingContext;
};

const GlobalLoadingProvider = (props: { children: ReactNode }) => {
  const provider = loadingProvider();
  return (
    <loadingContext.Provider value={provider}>
      {props.children}
    </loadingContext.Provider>
  );
};

export { GlobalLoadingProvider, useGlobalLoading };

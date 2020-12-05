import React, { useState } from "react";
import { Spinner } from "./Spinner";

export type SpinerChildrenState = {
  setLoadingState(value: boolean): void | Promise<void>;
};

interface SpinnerWrapperProps {
  Component: React.FC<SpinerChildrenState>;
}

export const WithLoading: React.FC<SpinnerWrapperProps> = ({
  Component,
  ...props
}) => {
  const [isLoading, setLoadingState] = useState(false);
  return (
    <>
      {isLoading === true ? (
        <Spinner />
      ) : (
        <Component setLoadingState={setLoadingState} {...props} />
      )}
    </>
  );
};

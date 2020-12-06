import React, { useState } from "react";
import { Spinner } from "./Spinner";

export type SpinerChildrenState = {
  setLoadingState(value: boolean): void | Promise<void>;
  navigation: any;
};

interface SpinnerWrapperProps {
  Component: React.FC<SpinerChildrenState>;
  navigation: any;
}

export const WithLoading: React.FC<SpinnerWrapperProps> = ({
  Component,
  navigation,
  ...props
}) => {
  const [isLoading, setLoadingState] = useState(false);
  return (
    <>
      {isLoading === true ? (
        <Spinner />
      ) : (
        <Component setLoadingState={setLoadingState} navigation={navigation} {...props} />
      )}
    </>
  );
};

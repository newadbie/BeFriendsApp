import React from "react";
import { Button, style } from "../Button";

export interface FormWrapperProps {
  submitAction: VoidFunction;
  submitText: string;
  preventDefault?: boolean;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  submitText,
  submitAction,
  preventDefault,
}) => {
  const submitHandler = (e: any) => {
    if (preventDefault) {
      e.preventDefault();
    }
    submitAction();
  };

  return (
    <form>
      {children}
      <Button
        text={submitText}
        type="submit"
        style={style.success}
        action={(e) => submitHandler(e)}
      />
    </form>
  );
};

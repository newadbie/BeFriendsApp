import React from "react";

export enum style {
  success = "success",
  warning = "warning",
}

export interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
  style: style;
  action?(event? : any): void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  type,
  action,
  style,
}) => {
  return (
    <button className={style} type={type} onClick={action}>
      {text}
    </button>
  );
};

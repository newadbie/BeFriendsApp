import React from "react";

export interface ContainerProps { 
    fluid?: boolean,
}

const wrapper : React.FC<ContainerProps> = ({ children, fluid }) => {
  const determineClasses = () => {
    if (fluid) {
      return "container fluid";
    } else if (!fluid) {
      return "container";
    }
  };
  return <div className={determineClasses()}>{children}</div>;
};

export default wrapper;

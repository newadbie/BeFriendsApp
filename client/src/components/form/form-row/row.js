import RowWrapper from "../row-wrapper/row-wrapper";
import InputText from "../inputs/text";
import classes from "./row.module.css";

const row = (props) => (
  <RowWrapper>
    <label className={classes.Label} for={props.name}>
      {props.name}
    </label>
    <InputText name={props.name} />
  </RowWrapper>
);

export default row;

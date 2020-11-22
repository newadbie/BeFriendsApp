import classes from "./wrapper.module.css";

const wrapper = (props) => (
  <ul className={classes.Wrapper}>{props.children}</ul>
);

export default wrapper;

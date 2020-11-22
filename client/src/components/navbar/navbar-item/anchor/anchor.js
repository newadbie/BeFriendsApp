import classes from "./anchor.module.css";

const anchor = (props) => (
  <a href="/" className={classes.Link}>
    {props.children}
  </a>
);

export default anchor;

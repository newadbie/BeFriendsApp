import classes from "./item.module.css";

const item = (props) => (
  <li className={classes.Item}>
    <a className={classes.Link} href="/">{props.children}</a>
  </li>
);

export default item;

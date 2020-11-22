import classes from "./item.module.css";
import Anchor from './anchor/anchor';

const item = (props) => (
  <li className={classes.Item}>
    <Anchor>{props.children}</Anchor>
  </li>
);

export default item;

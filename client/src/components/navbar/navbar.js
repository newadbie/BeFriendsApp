import Wrapper from "./wrapper/nav-wrapper";
import Item from "./navbar-item/navbar-item";
import classes from "./navbar.module.css";

const navbar = (props) => {
  console.log(props.items);
  const itemList = props.items
    ? props.items.map((item, index) => {
        return <Item key={index}>{item.title}</Item>;
      })
    : null;

  return (
    <nav className={classes.Menu}>
      <Wrapper>{itemList}</Wrapper>
    </nav>
  );
};

export default navbar;

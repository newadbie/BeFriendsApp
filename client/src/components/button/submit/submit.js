import classes from '../button.module.css';

const submitButton = (props) => <button type="submit" className={classes.btn}>{props.children}</button>

export default submitButton;
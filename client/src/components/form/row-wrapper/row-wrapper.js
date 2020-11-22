import classes from './row-wrapper.module.css';

const rowWrapper = (props) => <div className={classes.Column}>{props.children}</div>

export default rowWrapper;
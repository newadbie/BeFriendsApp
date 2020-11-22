import classes from './form.module.css';

const form = (props) => <form className={classes.Form}>{props.children}</form>

export default form;
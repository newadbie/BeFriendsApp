import Form from "../../components/form/form";
import FormRow from "../../components/form/form-row/row";
import SubmitButton from '../../components/button/submit/submit';
import classes from "./register.module.css";

const Register = (props) => {
  return (
    <div className={classes.RegisterForm}>
      <Form className={classes.RegisterForm}>
        <FormRow name="Name" />
        <SubmitButton>Register!</SubmitButton>
      </Form>
    </div>
  );
};

export default Register;

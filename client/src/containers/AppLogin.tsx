import React from 'react';
import { FormWrapper } from '../components/AppForm/FormWrapper';

export const AppLogin : React.FC = () => {
    const submitHandler = () => {

    }

    return (
        <FormWrapper submitAction={submitHandler} submitText="Login" preventDefault>
            dsadas
        </FormWrapper>
    )
}
import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

    // we handle initial state form with useState hooks
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    // evaluates if the form whether is valid or not, it triggers everytime formValidation updates
    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {

            if (formValidation[formValue] !== null) return false;

        }

        return true;
    }, [formValidation]);

    // function to handle input `onChange`
    const onInputChange = ({ target }) => {

        // we desestruct elements of target
        const { name, value } = target;

        // handle the state with setFormState dynamically
        setFormState({
            ...formState,
            [name]: value
        });
    }


    // set the original values into our state
    const onResetForm = () => {
        setFormState(initialForm);
    }

    // we create validators with formValidations functions
    const createValidators = () => {

        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {

            // we're desestructing function and error message
            const [fn, errorMessage] = formValidations[formField];

            // we create and assign dynamically 
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        setFormValidation(formCheckedValues);
    }


    // we are returning the form state, the functions, the isFormValid value and formValidation values
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    }
}
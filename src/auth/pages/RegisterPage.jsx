import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

// set the form-data
const formData = {
    email: '',
    password: '',
    displayName: ''
}

// we set validation functions with a message that will be displayed when a error accours.
const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe tener una @.'],
    password: [(value) => value.length >= 6, 'La contraseña debe tener mas de 6 letras.'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

    // we use dispatch and useSelector in order to use our slices and handle the state
    const { status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // useState hook to know if the form has been submited or not.
    const [formSubmitted, setFormSubmitted] = useState(false);

    // when status change, we compare this 'status' against value `checking` and memorize the boolean value
    const isCheckingAuthentication = useMemo(() => status === 'cheking', [status]);

    // using our custom hook 'useForm' to handle in order to handle the submit action
    const {
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid,
    } = useForm(formData, formValidations); // sending as param the form-data and the 'rules' with formValidations


    // function to trigger the action
    const onSubmit = (e) => {

        e.preventDefault();
        setFormSubmitted(true); // we set true submitted flag

        if (!isFormValid) return; // if the form is not valid, we return the function
        dispatch( startCreatingUserWithEmailPassword( formState ) ); // if everuthing went well, we start creating a new user
    }


    return (

        <AuthLayout title='Crear cuenta'>

            {/* Form/text fields section */}
            <form
                onSubmit={onSubmit}
                className='animate__animated animate__fadeIn animate__faster'
            >
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre completo"
                            type="text"
                            placeholder="Nombre completo"
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>

                    {/* Message error and button section */}
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity='error'>
                                {errorMessage}
                            </Alert>
                        </Grid>


                        <Grid item xs={12}>
                            <Button
                                disabled={isCheckingAuthentication}
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    {/* footer section */}
                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 1 }} > ¿Ya tienes cuenta? </Typography>
                        <Link component={RouterLink} color='inherit' to="/auth/login">
                            Ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}

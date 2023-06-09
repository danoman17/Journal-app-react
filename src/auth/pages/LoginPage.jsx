import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks';
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth';


export const LoginPage = () => {

    // we use dispatch and useSelector in order to use our sliceces and handle the state
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    // using custom hook and passing the current values
    // we get from this custom hook the value of email and password, and a function to handle change on inputs.
    const { email, password, onInputChange } = useForm({ email: '', password: '' });


    // when status change, we compare this 'status' against value `checking` and memorize the boolean value
    const isAuthenticating = useMemo(() => status === 'cheking', [status]);

    // function to handle form submit action
    const onSubmit = (event) => {

        event.preventDefault();

        // ! no es esta la accion a despachar
        dispatch( checkingAuthentication() );
    }
    // function to handle google button
    const onGoogleSignIn = () => {

        dispatch( startGoogleSignIn() );
    }

    return (
        <AuthLayout title='Login'>

            <form onSubmit={ onSubmit }>

                <Grid container>

                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="email@google.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="%&1#23asd"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

                        <Grid item xs={12} sm={6}>
                            <Button 
                                disabled={ isAuthenticating }
                                type="submit" 
                                variant="contained" 
                                fullWidth
                            >
                                Login
                            </Button>

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button 
                                disabled={ isAuthenticating }
                                variant="contained" 
                                fullWidth
                                onClick={ onGoogleSignIn }
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>

                        </Grid>

                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Link component={RouterLink} color='inherit' to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>

                </Grid>

            </form>

        </AuthLayout>
    )
}
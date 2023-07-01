import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';


const formData = { 
    email: '', 
    password: '' 
};


export const LoginPage = () => {

    // we use dispatch and useSelector in order to use our slices and handle the state
    const { status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // using custom hook and passing the current values
    // we get from this custom hook the value of email and password, and a function to handle change on inputs.
    const { email, password, onInputChange } = useForm( formData );


    // when status change, we compare this 'status' against value `checking` and memorize the boolean value
    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    // function to handle form submit action (login with email and password)
    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(startLoginWithEmailPassword({ email, password }));
    }
    // function to handle google button (google with google account)
    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }

    return (
        <AuthLayout title='Login'>

            {/* text field/form section */}
            <form
                onSubmit={onSubmit}
                className='animate__animated animate__fadeIn animate__faster'
            >

                <Grid container>

                    <Grid
                        item
                        xs={12}
                        sx={{ mt: 3 }}
                    >
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

                    <Grid
                        item
                        xs={12}
                        sx={{ mt: 2 }}
                    >
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

                    {/* error message section */}
                    <Grid
                        container
                        display={!!errorMessage ? '' : 'none'}
                        sx={{ mt: 1 }}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Alert severity='error'>
                                {errorMessage}
                            </Alert>
                        </Grid>
                    </Grid>

                    {/* button section */}
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            mb: 2,
                            mt: 1
                        }}
                    >
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Login
                            </Button>

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                variant="contained"
                                fullWidth
                                onClick={onGoogleSignIn}
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Link to create new account */}
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
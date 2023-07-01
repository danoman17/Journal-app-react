import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { chekingCredentials, login, logout } from './authSlice';


// action when we submit form, we change status to 'cheking'
export const checkingAuthentication = () =>{
    return async( dispatch ) => {
        dispatch( chekingCredentials() );
    }
}

// function to auth user with google account
export const startGoogleSignIn = () => {

    return async( dispatch ) => {

        dispatch( chekingCredentials() ); // started checking credentials
        const result = await signInWithGoogle(); // we get info from firebase and google auth

        // if the result negative flag `ok:false` we trigger logout slice method and send error message as payload
        if( !result.ok ) return dispatch( logout( result.errorMessage ) ); 
        // if everything went well, we trigger logout slice method sendig result as payload.
        dispatch( login( result ) );
    }
}


//function to auth user with password and email
export const startLoginWithEmailPassword = ({ email, password }) => {

    return async( dispatch ) => {

        dispatch(chekingCredentials()); // started checking credentials
        const result = await loginWithEmailPassword({ email, password }); // send pass and email to confirm

        // if smth wo wrong we trigger logout with payload
        if( !result.ok ) return dispatch( logout( result ) ); 
        // if everything went well, we trigger login slice method sendig result as payload.
        dispatch( login( result ) );
    }
}

// function to create a new user with email and password
export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async(dispatch) => {

        dispatch( chekingCredentials() ); // started checking credentials

        // we get info from firebase
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        // show error message 
        if( !ok ) return dispatch( logout( {errorMessage} ) );

        //login if everything went well we login
        dispatch( login( { uid, displayName, email, photoURL } ) );
        
    }
}

// logout action
export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        dispatch(logout());
    }
}
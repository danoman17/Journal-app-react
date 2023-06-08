import { registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { chekingCredentials, login, logout } from './authSlice';


// action when we submit form, we change status to 'cheking'
export const checkingAuthentication = () =>{

    return async( dispatch ) => {

        dispatch( chekingCredentials() );

    }
}

// handle the google button action
export const startGoogleSignIn = () => {

    return async( dispatch ) => {
        
        // changing the status to `cheking`
        dispatch( chekingCredentials() );

        const result = await signInWithGoogle(); // we get info from firebase and google auth

        // if the result negative flag `ok:false` we trigger logout slice method and send error message as payload
        if( !result.ok ) return dispatch( logout( result.errorMessage ) ); 

        // if everything went well, we trigger logout slice method sendig result as payload.
        dispatch( login( result ) );
    }
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async(dispatch) => {
        dispatch( chekingCredentials() );

        const resp = await registerUserWithEmailPassword({ email, password, displayName });

        console.log(resp);
    }
}
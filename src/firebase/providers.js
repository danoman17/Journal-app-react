import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const gooogleProvider = new GoogleAuthProvider();


// function provides info from firebase when login with google account
export const signInWithGoogle = async () => {
    try {

        const result = await signInWithPopup( FirebaseAuth, gooogleProvider ); // we use this function to get the result

        // with this line, we're getting the tokens and credentials, in this occation, we're not using it.
        // const credentials = GoogleAuthProvider.credentialFromResult( result );

        // we desestruc some element we're intrested in
        const { displayName, email, photoURL, uid } = result.user;

        // we return user info and succes flag `ok`
        return {
            ok:true,
            //User info
            displayName,
            email,
            photoURL,
            uid
        }
    }
    catch(error) { // if we do not recive info, we return error message and negative flag `ok`

        const errorCode = error.code; // code error
        const errorMessage = error.message; // message error

        return{
            ok:false, 
            errorMessage
        }
    }
}

// function provides info from firebase when login
export const loginWithEmailPassword = async({ email, password }) => {
    try {
        
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password); // we use this function to get the result
        const  { uid, photoURL, displayName } = resp.user; //we desestruct the info we're interested in

        // we return user info and succes flag `ok`
        return{
            ok: true,
            // user info
            uid, 
            photoURL, 
            displayName,
        }

    } catch (error) {  // if we do not recive info, we return error message and negative flag `ok`
        return { 
            ok: false, 
            errorMessage: error.message
        }
    }
}

// function that uploads a new user
export const registerUserWithEmailPassword = async( { email, password, displayName } ) => {

    try {
        
        // using firebase methods we register a new user
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user; // desestruct of id and photo
        
        // we upload new displayName for current user.
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        // return flag and data
        return{
            ok: true,
            // user data 
            uid, 
            photoURL, 
            email, 
            displayName
        }

    } catch (error) { // catching error by sending a errorMessage
        
        return { ok: false, errorMessage: error.message }
    }
}


// logout from firebase
export const logoutFirebase  = async() => {
    return await FirebaseAuth.signOut();
}
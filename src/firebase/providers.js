import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";

const gooogleProvider = new GoogleAuthProvider();


// function provides info from firebase and google auth
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup( FirebaseAuth, gooogleProvider );

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

export const registerUserWithEmailPassword = async( { email, password, displayName } ) => {
    try {
        console.log({ email, password, displayName });


        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        console.log( resp );

        // TODO actualizar el display name en Firebase.

        return{
            ok: true, 
            uid, photoURL, email, displayName
        }

    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }
}
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

// Create a new instance of GoogleAuthProvider
const gooogleProvider = new GoogleAuthProvider();

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, gooogleProvider);

    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    };
  } catch (error) {
    // const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage
    };
  }
};

// Function to login with email and password
export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      displayName
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    };
  }
};

// Function to register a new user with email and password
export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    };
  }
};

// Function to log out the current user
export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};

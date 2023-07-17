import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/providers'; 
import { chekingCredentials, login, logout } from '../../../src/store/auth/authSlice'; 
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks'; 
import { clearNotesLogout } from '../../../src/store/journal/journalSlice'; 
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers'); //! Mocking the Firebase providers

describe('Pruebas en AuthThunks', () => {

    const dispatch = jest.fn(); // Creating a mock dispatch function
    beforeEach(() => jest.clearAllMocks()); // Clearing all mocks before each test

    //* Test case for checkingAuthentication thunk
    test('debe de invocar el checkingCredentials ', async () => { 

        await checkingAuthentication()(dispatch); // Calling the checkingAuthentication thunk with the mock dispatch

        expect(dispatch).toHaveBeenCalledWith(chekingCredentials()); // Expecting the dispatch function to be called with chekingCredentials action

    });

    //* Test case for startGoogleSignIn thunk - success scenario
    test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async () => { 

        const loginData = { ok: true, ...demoUser }; // Login data for successful login
        await signInWithGoogle.mockResolvedValue(loginData); // Mocking the resolved value of signInWithGoogle function

        //thunk
        await startGoogleSignIn()(dispatch); // Calling the startGoogleSignIn thunk with the mock dispatch

        expect(dispatch).toHaveBeenCalledWith(chekingCredentials()); // Expecting the dispatch function to be called with chekingCredentials action
        expect(dispatch).toHaveBeenCalledWith(login(loginData)); // Expecting the dispatch function to be called with login action and loginData

    });

    //* Test case for startGoogleSignIn thunk - error scenario
    test('startGoogleSignIn debe de llamar checkingCredentials y login - Error', async () => { 

        const loginData = { ok: false, errorMessage: 'Un error en Google' }; // Login data for failed login

        await signInWithGoogle.mockResolvedValue(loginData); // Mocking the resolved value of signInWithGoogle function
        //* thunk
        await startGoogleSignIn()(dispatch); // Calling the startGoogleSignIn thunk with the mock dispatch

        expect(dispatch).toHaveBeenCalledWith(chekingCredentials()); // Expecting the dispatch function to be called with chekingCredentials action
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage)); // Expecting the dispatch function to be called with logout action and error message

    });

    //* Test case for startLoginWithEmailPassword thunk - success scenario
    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async () => { 

        const loginData = { ok: true, ...demoUser }; // Login data for successful login
        const formData = { email: demoUser.email, password: '123456' }; // Form data for login

        await loginWithEmailPassword.mockResolvedValue(loginData); // Mocking the resolved value of loginWithEmailPassword function
        await startLoginWithEmailPassword(formData)(dispatch); // Calling the startLoginWithEmailPassword thunk with form data and the mock dispatch

        expect(dispatch).toHaveBeenCalledWith(chekingCredentials()); // Expecting the dispatch function to be called with chekingCredentials action
        expect(dispatch).toHaveBeenCalledWith(login(loginData)); // Expecting the dispatch function to be called with login action and loginData

    });

    //* Test case for startLogout thunk
    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => { 

        await startLogout()(dispatch); // Calling the startLogout thunk with the mock dispatch

        expect(logoutFirebase).toHaveBeenCalled(); // Expecting the logoutFirebase function to be called
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout()); // Expecting the dispatch function to be called with clearNotesLogout action
        expect(dispatch).toHaveBeenCalledWith(logout()); // Expecting the dispatch function to be called with logout action

    });
});

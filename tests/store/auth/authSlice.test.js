import { authSlice, chekingCredentials, login, logout } from '../../../src/store/auth/authSlice'; 
import { authenticatedState, demoUser, initialState } from '../../fixtures/authFixtures'; 

describe('Pruebas en el authSlice', () => {

    //* Test case for checking initial state and name
    test('debe de regresar el estado inicial y llamarse "auth" ', () => { 

        const state = authSlice.reducer(initialState, {}); // Reducing the initial state with an empty action

        expect(state).toEqual(initialState); // Expecting the state to be equal to the initial state
        expect(authSlice.name).toBe('auth'); // Expecting the name property of authSlice to be 'auth'
    });

    //* Test case for authentication
    test('debe de realizar la autenticación ', () => { 

        const state = authSlice.reducer(initialState, login(demoUser)); // Reducing the initial state with a login action and demoUser data

        expect(state).toEqual({ // Expecting the state to be equal to the expected state object
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        })

    });

    //* Test case for logout without error message
    test('debe de realizar el logout sin argumentos', () => { 

        const state = authSlice.reducer(authenticatedState, logout()); // Reducing the authenticated state with a logout action

        expect(state).toEqual({ // Expecting the state to be equal to the expected state object
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });

    //* Test case for logout with an error message
    test('debe de realizar el logout y mostrar un mensaje de error', () => { 

        const errorMessage = 'Credenciales no son correctas'; // Error message to be displayed

        const state = authSlice.reducer(authenticatedState, logout({ errorMessage })); // Reducing the authenticated state with a logout action and the error message

        expect(state).toEqual({ // Expecting the state to be equal to the expected state object
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });

    });

    //* Test case for changing state to checking
    test('debe de cambiar el estado a checking ', () => { 

        const state = authSlice.reducer(authenticatedState, chekingCredentials()); // Reducing the authenticated state with a chekingCredentials action

        expect(state.status).toBe('checking'); // Expecting the status property of the state to be 'checking'

    });


})

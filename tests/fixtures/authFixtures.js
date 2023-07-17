export const initialState = {
    status: 'checking', // Authentication status: 'not-authenticated', 'checking', 'authenticated'
        uid: null, // User ID
        email: null, // User email
        displayName: null, // User display name
        photoURL: null, // User photo URL
        errorMessage: null, // Error message related to authentication
}


export const authenticatedState = {
    status: 'authenticated', // Authentication status: 'not-authenticated', 'checking', 'authenticated'
        uid: '123ABC', // User ID
        email: 'demo@google.com', // User email
        displayName: 'Demo User', // User display name
        photoURL: 'https://demo.jpg', // User photo URL
        errorMessage: null, // Error message related to authentication
}

export const NotAuthenticatedState = {
    status: 'not-authenticated', // Authentication status: 'not-authenticated', 'checking', 'authenticated'
        uid: null, // User ID
        email: null, // User email
        displayName: null, // User display name
        photoURL: null, // User photo URL
        errorMessage: null, // Error message related to authentication
}

export const demoUser = {
    uid:'ABC123',
    email: 'demo@google.com',
    displayName:'Demo User',
    photoURL:'https://foto.jpg',
}
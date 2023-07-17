export const initialState = {
    isSaving: false, // Flag to indicate if saving is in progress
    messageSaved: '', // Message to indicate the status of saving
    notes: [], // Array to store journal notes
    active: null, // Currently active note
};

export const initialStateNoteActive = {
    isSaving: false, // Flag to indicate if saving is in progress
    messageSaved: '', // Message to indicate the status of saving
    notes: [], // Array to store journal notes
    active: {
        id:'ABC123',
        title: 'Prueba Nota',
        body: 'Esta es una nota de prueba para el testing original',
        imageUrls: [],
        date: 1688934130987,
    }, // Currently active note
};



export const photosUrlsTest = [
    'photo1.jpg',
    'photo2.jpg',
    'photo3.jpg',
];

export const initialStateUpdateNote = {
    isSaving: false, // Flag to indicate if saving is in progress
    messageSaved: '', // Message to indicate the status of saving
    notes: [
        {
            id:'ABC123',
            title: 'Prueba Nota',
            body: 'Esta es una nota de prueba para el testing original',
            imageUrls: [],
            date: 1688934130987,
        },
        {
            id:'ABC1234',
            title: 'Prueba Nota',
            body: 'Esta es una nota de prueba para el testing',
            imageUrls: [],
            date: 1688934130987,
        }
    ], // Array to store journal notes
    active: null, // Currently active note
};

export const newNote = {
    title: '',
    body: '',
    imageUrls: [],
    date: 1688934130987,
};

export const mockNote = {
    id:'ABC123',
    title: 'Prueba Nota',
    body: 'Esta es una nota de prueba para el testing modificada',
    imageUrls: [],
    date: 1688934130987,
};
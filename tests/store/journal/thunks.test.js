// Import required functions from Firebase and Redux files
import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";

// Test suite for 'journalThunks'
describe('Pruebas en journalThunks', () => {
   
    // Define mock functions to simulate Redux store behavior
    const dispatch = jest.fn();
    const getState = jest.fn();

    // Reset mock functions before each test case
    beforeEach( () => jest.clearAllMocks() );

    // Test case: 'startNewNote' should create a new empty note
    test('startNewNote debe crear una nueva nota en blanco', async() => {

        // Define a user ID for the test
        const uid = 'TEST-UID';

        // Mock the Redux store to return the defined user ID when 'getState' is called
        getState.mockReturnValue({ auth: { uid:uid } });

        // Call the 'startNewNote' thunk function with the mock store and user ID
        await startNewNote()( dispatch, getState );
        
        // Expect that the 'savingNewNote' action is dispatched
        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );

        // Expect that the 'addNewEmptyNote' action is dispatched with the expected payload
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body:'',
            title:'',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls: [],
        }) );

        // Expect that the 'setActiveNote' action is dispatched with the expected payload
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body:'',
            title:'',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls: [],
        }) );

        // Delete notes from Firebase
        // Get a reference to the 'notes' collection for the given user
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

        // Fetch all documents (notes) from the collection
        const docs = await getDocs( collectionRef );

        // Prepare an array to store delete promises for each note
        const deletePromises = [];

        // Iterate through all documents (notes) and create a delete promise for each
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );
        
        // Wait for all delete promises to resolve (all notes are deleted)
        await Promise.all( deletePromises );

    },30000);
});

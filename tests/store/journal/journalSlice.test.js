// Import statements

// Import the necessary functions and variables from the journalSlice module
import { addNewEmptyNote, clearNotesLogout, deleteNoteByID, journalSlice, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "../../../src/store/journal/journalSlice";

// Import initial state and fixture data from journalFixtures module
import { initialState, initialStateNoteActive, initialStateUpdateNote, mockNote, newNote, photosUrlsTest } from "../../fixtures/journalFixtures";

// Describe block for tests related to the journalSlice
describe('Pruebas en el journalSlice', () => {

    // Test case: Verify that the reducer returns the initial state and the correct name
    test('debe de regresar el estado inicial y llamarse "journal" ', () => {
        const state = journalSlice.reducer(initialState, {});
        expect(state).toEqual(initialState);
        expect(journalSlice.name).toBe('journal');
    });

    // Test case: Verify that the reducer changes the state to 'saving'
    test('debe de cambiar el estado a saving ', () => {
        const state = journalSlice.reducer(initialState, savingNewNote());
        expect(state).toEqual({
            isSaving: true,
            messageSaved: '',
            notes: [],
            active: null,
        });
    });

    // Test case: Verify that the reducer adds a new empty note
    test('debe de crear una nota nueva ', () => {
        const state = journalSlice.reducer(initialState, addNewEmptyNote(newNote));
        expect(state.notes).toEqual([newNote]);
    });

    // Test case: Verify that the reducer sets an active note
    test('debe de settear una nota activa', () => {
        const state = journalSlice.reducer(initialState, setActiveNote(mockNote));
        expect(state.active).toBe(mockNote);
        expect(state.messageSaved).toEqual('');
    });

    // Test case: Verify that the reducer sets one or more notes
    test('debe de  settear una o varias notas', () => {
        const state = journalSlice.reducer(initialState, setNotes(newNote));
        expect(state.notes).toBe(newNote);
    });

    // Test case: Verify that the reducer changes the state to 'saving'
    test('debe cambiar el estado a saving', () => {
        const state = journalSlice.reducer(initialState, setSaving());
        expect(state.isSaving).toBe(true);
        expect(state.messageSaved).toEqual('');
    });

    // Test case: Verify that the reducer updates a note
    test('debe actualizar una nota', () => {
        const state = journalSlice.reducer(initialStateUpdateNote, updateNote(mockNote));
        expect(state.messageSaved).toEqual('Prueba Nota, updated successfully');
        expect(state.isSaving).toBe(false);
    });

    // Test case: Verify that the reducer sets photos to the active note
    test('debe de settear fotos a nota activa', () => {
        const state = journalSlice.reducer(initialStateNoteActive, setPhotosToActiveNote(photosUrlsTest));
        expect(state.active.imageUrls).toEqual(photosUrlsTest);
    });

    // Test case: Verify that the reducer clears notes on logout
    test('debe de limpiar notas al momento de logout ', () => {
        const state = journalSlice.reducer(initialStateNoteActive, clearNotesLogout());
        expect(state).toEqual({ isSaving: false, messageSaved: '', notes: [], active: null });
    });

    // Test case: Verify that the reducer deletes a note by ID
    test('debe de borrar nota por ID ', () => {
        const state = journalSlice.reducer(initialStateUpdateNote, deleteNoteByID('ABC123'));
        expect(state).toEqual(
            {
                isSaving: false,
                messageSaved: '',
                notes: [
                    {
                        id: 'ABC1234',
                        title: 'Prueba Nota',
                        body: 'Esta es una nota de prueba para el testing',
                        imageUrls: [],
                        date: 1688934130987
                    }
                ],
                active: null
            }
        );
    });
});

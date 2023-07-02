import { createSlice } from '@reduxjs/toolkit';

// *Create a Redux slice named "journalSlice"

export const journalSlice = createSlice({
    name: 'journal', // Name of the slice
    initialState: {
        isSaving: false, // Flag to indicate if saving is in progress
        messageSaved: '', // Message to indicate the status of saving
        notes: [], // Array to store journal notes
        active: null, // Currently active note


        // Example structure for active note
        // active: { 
        //     id:'ABC123',
        //     title: '',
        //     body: '',
        //     date: 130623,
        //     imageUrls: [], // Array of image URLs associated with the note
        // }
    },
    reducers: {
        // *Reducer: savingNewNote
        savingNewNote: (state) => {
            state.isSaving = true; // Set isSaving to true when saving a new note
        },

        // *Reducer: addNewEmptyNote
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload); // Add a new note to the notes array
            state.isSaving = false; // Set isSaving to false after adding the note
        },

        // *Reducer: setActiveNote
        setActiveNote: (state, action) => {
            state.active = action.payload; // Set the active note to the one provided in the payload
            state.messageSaved = ''; // Clear the messageSaved property
        },

        // *Reducer: setNotes
        setNotes: (state, action) => {
            state.notes = action.payload; // Replace the notes array with the one provided in the payload
        },

        // *Reducer: setSaving
        setSaving: (state, action) => {
            state.isSaving = true; // Set isSaving to true when saving
            state.messageSaved = ''; // Clear the messageSaved property
        },

        // *Reducer: updateNote
        updateNote: (state, action) => {
            state.isSaving = false; // Set isSaving to false after updating the note

            // Map through the notes array and update the note with the same ID as the payload
            state.notes = state.notes.map((note) => {
                if (note.id === action.payload.id) {
                    return action.payload; // Replace the note with the updated one
                }
                return note;
            });

            state.messageSaved = `${action.payload.title}, updated successfully`; // Set a success message with the updated note title
        },

        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved='';
            state.notes = [];
            state.active = null;
        },
        //*Reducer: deleteNoteByID
        deleteNoteByID: (state, action) => {

            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );

        },
    },
});

// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addNewEmptyNote,
    clearNotesLogout,
    setActiveNote,
    setPhotosToActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteByID,
} = journalSlice.actions;

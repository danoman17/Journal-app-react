import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from './journalSlice';
import { loadNotes } from '../../helpers';


export const startNewNote = () => {
    return async( dispatch, getSatate ) => {
        
        dispatch( savingNewNote() );

        const { uid } = getSatate().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }


        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`) );
        await setDoc( newDoc,newNote );

        newNote.id = newDoc.id;
        // dispatch

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );
    }
}



export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };

        delete noteToFireStore.id; //delete not from Firebase, but in JS

        // console.log( noteToFireStore );

        const docRef = doc( FirebaseDB,`${ uid }/journal/notes/${ note.id }` ); //reference to doc
        await setDoc( docRef, noteToFireStore, { merge: true } );

        dispatch( updateNote( note ) );
    }
}
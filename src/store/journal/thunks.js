import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from './journalSlice';
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
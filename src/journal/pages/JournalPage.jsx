import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { startNewNote } from '../../store/journal';
import { useDispatch, useSelector } from 'react-redux';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';


export const JournalPage = () => {

    const dispatch = useDispatch();
    const { isSaving, active } = useSelector( state => state.journal );

    const onClickNewNote = () => {
        dispatch( startNewNote() );
    }


    return (
        <JournalLayout>
            
            {
                (!!active) 
                    ? <NoteView />
                    : <NothingSelectedView />
            }

            {/* Red button to add a new post */}
            <IconButton
                onClick={ onClickNewNote }
                disabled={ isSaving }
                size='large'
                sx={{
                    color: 'white', 
                    background: 'red',
                    ':hover': { backgroundColor: 'red', opacity: 0.9 },
                    position: 'fixed',
                    right: 50, 
                    bottom: 50
                }}
            >
                
                <AddOutlined sx={{ fontSize: 30 }}/>
            </IconButton>

        </JournalLayout>
    )
}

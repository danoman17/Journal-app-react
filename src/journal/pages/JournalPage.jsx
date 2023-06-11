import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';


export const JournalPage = () => {
    return (
        <JournalLayout>
            
            {/* <NothingSelectedView /> */}
            <NoteView />


            {/* Red button to add a new post */}
            <IconButton
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

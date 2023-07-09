import { useState } from 'react';
import { Box, Toolbar } from '@mui/material'
import { Navbar, Sidebar } from '../components';

// we declare drawer width
const drawerWidth = 240;

/* 
    Journal page's layout 
*/
export const JournalLayout = ({ children }) => {


    //state hook represents the Drawer's state at Sidebar component.
    const [open, setOpen] = useState(false); // starts in false


    return (
        <Box 
            sx={{ display: 'flex' }}
            className='amimate__animated animate__fadeIn animate__faster'
        >

            <Navbar 
                drawerWidth={ drawerWidth } 
                setOpen={ setOpen }
            />
            <Sidebar 
                drawerWidth={ drawerWidth } 
                drawerState={ open }
                setOpen={ setOpen }
            />

            <Box 
                component='main'
                sx={{ 
                    flexGrow:1, 
                    p:3 
                }}
            >
                <Toolbar />
                { children }

            </Box>

        </Box>
    )
}

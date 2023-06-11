import { Box, Toolbar } from "@mui/material"
import { Navbar, Sidebar } from "../components";

// we declare drawer width
const drawerWidth = 240;

/* 
    Journal page's layout 
*/
export const JournalLayout = ({ children }) => {
    return (
        <Box 
            sx={{ display: 'flex' }}
            className='amimate__animated animate__fadeIn animate__faster'
        >

            <Navbar drawerWidth={ drawerWidth } />
            <Sidebar drawerWidth={ drawerWidth } />

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

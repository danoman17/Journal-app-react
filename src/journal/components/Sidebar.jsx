import { TurnedInNot } from '@mui/icons-material';
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';
import { drawerHandle } from '../../helpers';
import { useTheme } from '@emotion/react';


/* sidebar initial width value of 240 */
export const Sidebar = ({ drawerWidth = 240, drawerState, setOpen }) => {

    // we use useSelector hook to access displayName value
    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);

    //we use theme, in order to get current display size.
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <Box
            component='nav'
            onClick={ drawerHandle( setOpen, false ) }
            sx={{
                width: { sm: drawerWidth },
                flexShrink: { sm: 0 }
            }}
        >

            <Drawer
                PaperProps={{
                    md: {

                    }
                }}
                variant={isMdUp?'permanent':'temporary'} //temporary
                open = {drawerState}
                onClose={ drawerHandle( setOpen, false ) }
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                    >
                        {displayName}
                    </Typography>
                </Toolbar>


                <Divider />

                <List>
                    {
                        notes.map(note => (
                            <SideBarItem key={ note.id } { ...note }/>
                        ))
                    }
                </List>
            </Drawer>

        </Box>
    )
}

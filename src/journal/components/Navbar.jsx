import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { startLogout } from "../../store/auth/thunks";
import { drawerHandle } from "../../helpers";



/* navbar with a 240px left (drawer) space  */
export const Navbar = ({ drawerWidth = 240, setOpen }) => {

	const dispatch = useDispatch(); // usigna dispatch to trigger slice methods

	//function to logout 
	const onLogout = () => {
		dispatch( startLogout() );
	}

	return (

		<AppBar
			position='fixed'
			sx={{
				width: { sm: `calc(100% - ${drawerWidth}px)` },
				ml: { sm: `${drawerWidth}px` }
			}}
		>
			<Toolbar>
				<IconButton
					color='inherit'
					edge='start'
					onClick={ drawerHandle(setOpen, true) }
					sx={{
						mr: 2,
						display: { sm: 'none' }
					}}
				>
					<MenuOutlined />
				</IconButton>

				<Grid 
					container 
					direction='row' 
					justifyContent='space-between' 
					alignItems='center'
				>
					<Typography variant='h6' noWrap component='div'> Journal </Typography>
					<IconButton
						color='error'
						onClick={ onLogout }
					>
						<LogoutOutlined/>
					</IconButton>
				</Grid>
			</Toolbar>
		</AppBar>
	)
}

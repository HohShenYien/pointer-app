import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material';
import { useState } from 'react';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import AuthContext from '../../Plugins/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function MenuAppBar() {
    const [drawer, setDrawer] = useState(false);
    let auth = useContext(AuthContext);
    const handleClick = () => {
        setDrawer(!drawer);
    }
    if (auth.isAuthenticated) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" color='appbar'>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={handleClick}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            id="menu-appbar"
                            anchor='left'
                            open={drawer}
                            onClose={() => setDrawer(false)}
                        >
                            <Box
                                sx={{ width: 250 }}
                                role="presentation"
                            >
                                <List>
                                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                        <ListItem key={index} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: open ? 3 : 'auto',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                                <Divider />
                                <List>
                                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                        <ListItem key={index} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: open ? 3 : 'auto',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Drawer>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to={'/'} className="undecorated text--black">
                                Pointer App
                            </Link>
                        </Typography>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
    else {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" color="appbar">
                    <Toolbar>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1, textDecoration: 'none', fontWeight: 'bold' }}>
                            <Link to={'/'} className="undecorated text--black">
                                Pointer App
                            </Link>
                        </Typography>
                        <div>
                            <Button variant="contained" color="secondary" sx={{ marginRight: 2 }} href="/register">Register</Button>
                            <Button variant="contained" color="secondary" href="/login">Login</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box >
        )
    }
}
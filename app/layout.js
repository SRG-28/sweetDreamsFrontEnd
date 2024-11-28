"use client";

import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import AddIcon from '@mui/icons-material/Add';
import ChecklistIcon from '@mui/icons-material/Checklist';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';
import React from "react";
import ToolBar from "@/app/ToolBar";
import ToolBarV from "@/app/ToolBarV";
import { red } from '@mui/material/colors';

const DRAWER_WIDTH = 240;

const LINKS = [
    { text: 'Add', href: '/admin/homeProductsClient/create', icon: AddIcon },
    { text: 'Edit', href: '/admin/homeProductsClient', icon: EditNoteIcon },
    { text: 'Orders', href: '/ordersClients', icon: ChecklistIcon },
    { text: 'New Administrators', href: '/userClient/create', icon: PersonAddIcon },
];

const PLACEHOLDER_LINKS = [
    { text: 'Settings', href: '/userClient/edit/1', icon: SettingsIcon },
    { text: 'Logout', href: '/logout', icon: LogoutIcon },
];



export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <SessionProvider>
            <ThemeRegistry>
                    <ToolBar />
                    <ToolBarV/>

                <Drawer
                    sx={{
                        width: DRAWER_WIDTH,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            boxSizing: 'border-box',
                            top: ['48px', '56px', '64px'],
                            height: 'auto',
                            bottom: 0,
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Divider />
                    <List>
                        {LINKS.map(({ text, href, icon: Icon }) => (
                            <ListItem key={href} disablePadding>
                                <ListItemButton component="a" href={href}>
                                    <ListItemIcon>
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ mt: 'auto' }} />
                    <List>
                        {PLACEHOLDER_LINKS.map(({ text, href, icon: Icon }) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton component="a" href={href}>
                                    <ListItemIcon>
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.default',
                        ml: `${DRAWER_WIDTH}px`,
                        mt: ['48px', '56px', '64px'],
                        minHeight: '100vh',
                        boxSizing: 'border-box',
                    }}
                >
                    {children}
                </Box>
            </ThemeRegistry>
        </SessionProvider>
        </body>
        </html>
    );
}

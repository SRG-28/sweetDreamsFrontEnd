"use client";
import {signIn, signOut, useSession} from "next-auth/react";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportIcon from "@mui/icons-material/Support";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from "@mui/icons-material/Logout";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import ChecklistIcon from "@mui/icons-material/Checklist";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import React from "react";

const DRAWER_WIDTH = 240;

const LINKS = [
    {text: 'Home', href: '/', icon: HomeIcon},
    {text: 'Products', href: '/admin/homeProductsClient', icon: ChecklistIcon},
];

const handleVerticalClick = (item) => {
    if (item.text === 'Logout') {
        signOut().then(() => console.log("signOut", "bye"));
    } else if (item.text === 'Login') {
        signIn().then(() => console.log("signIn", "welcome"));
    }
};

const ToolBarV = () => {
    const {data: session} = useSession();
    console.log("ToolBar", {session});

    const VERTICAL_LINKS = [
        {text: 'Products Admin', href: '/homeProductsUser', icon: ChecklistIcon},
        {text: 'New products', href: '/admin/homeProductsClient/create', icon: ChecklistIcon},
        {text: 'Orders', href: '/ordersClients', icon: ChecklistIcon},
        ...(session?.user ? [{text: 'Logout', icon: LogoutIcon}] : [{text: 'Login', icon: LoginIcon}]),
    ];

    return (
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
            {session?.user ? (
                <span>Welcome, {session?.user.username}
                        </span>
            ) : null}
            <Divider/>
            <List>
                {LINKS.map(({text, href, icon: Icon}) => (
                    <ListItem key={href} disablePadding>
                        <ListItemButton component={Link} href={href}>
                            <ListItemIcon>
                                <Icon/>
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider sx={{mt: 'auto'}}/>
            <List>
                {VERTICAL_LINKS.map(({text, href, icon: Icon}) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton href={href} onClick={() => handleVerticalClick({text})}>
                            <ListItemIcon>
                                <Icon/>
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default ToolBarV;
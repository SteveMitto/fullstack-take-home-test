import { Box, Divider, Link, Stack } from '@mui/material'
import React, { useState, useEffect, useMemo } from 'react'
import logo from "../../logo.png"
import BookIcon from '@mui/icons-material/Book';
import DashboardIcon from '@mui/icons-material/Dashboard';

interface NavItems {
    id: number;
    name: string;
    path: string;
}

function Sidebar() {
    const [active, setActive] = useState<number>(0);
    const navigationItems: NavItems[] = useMemo(() => [
        { id: 0, name: "Dashboard", path: "/dashboard" },
        { id: 1, name: "Books", path: "/" },
    ], [])

    useEffect(() => {
        const activePath = navigationItems.find(item => item.path === window.location.pathname)
        if (activePath) {
            setActive(activePath.id)
        }
    }, [navigationItems])

    return (
        <Box px={2}
            overflow="hidden"
            height={"100vh"}
            width="100%"
            bgcolor={(theme: any) => theme.primary.steelBlue}
            position='sticky' top='0' left='0'>
            <Box my={2} display="flex" justifyItems={"center"}>
                <img src={logo} style={{ margin: "auto" }} alt="logo" width={"100"} />
            </Box>
            <Box color={(theme) => theme.secondary.yellowDark} textAlign={"center"} fontWeight={"500"} mb={2}>Teachers Platform</Box>
            <Divider></Divider>
            <Stack mt={5} direction="column" justifyContent="center" spacing={2}>
                {navigationItemsComp(navigationItems, active)}
            </Stack>

        </Box>
    )
}


function navigationItemsComp(navItems, active) {
    return navItems.map(item => (
        <Link key={item.id} py={1} href={item.path} color={(theme) => active === item.id ? theme.secondary.yellowDark : theme.primary.turquoise} underline="none">
            <Box display="flex" sx={{ width: "100%", display: "flex", alignItems: "center" }}>
                <Box display="flex" alignItems="center">
                    {
                        item.id === 0 ? <DashboardIcon fontSize='small' /> : <BookIcon fontSize='small' />
                    }
                </Box>
                <Box sx={{ fontWeight: '500', marginLeft: "12px" }}>{item.name}</Box>
            </Box>

        </Link>
    ))
}
export default Sidebar
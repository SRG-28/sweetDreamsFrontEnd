import {SessionProvider} from "next-auth/react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import ToolBarV from "@/app/ToolBarV";
import Box from "@mui/material/Box";
import ToolBar from "@/app/ToolBar";

const DRAWER_WIDTH = 240;
export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <SessionProvider>
            <ThemeRegistry>
                <ToolBar/>
                <ToolBarV/>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'E3EDDF',
                        ml: `${DRAWER_WIDTH}px`,
                        mt: ['48px', '56px', '64px'],
                        p: 3,
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
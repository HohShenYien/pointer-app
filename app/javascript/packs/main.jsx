import React, { useContext, useMemo, useState } from 'react'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Home from "../routes/home";

// setting material themes
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";

import AuthContext from "../Plugins/AuthContext";
import Login from "../routes/login";
import HomePage from "../routes/homepage";

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF8C00',
        },
        secondary: {
            main: '#998CEB',
        },
        success: {
            main: '#B4FE98',
        },
        error: {
            main: '#FA8072'
        },
        appbar: {
            main: '#FFFFFF90'
        }
    },
});

function AppRouter() {
    const [user, setUser] = useState({
        isAuthenticated: true,
        user: null
    });
    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <AuthContext.Provider value={value}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<RequireAuth location="/home"><Home /></RequireAuth>} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

function RequireAuth({ children, location }) {
    let auth = useContext(AuthContext);

    if (!auth.user.isAuthenticatedcated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('root');
    const root = createRoot(rootElement);
    root.render(
        <ThemeProvider theme={theme}>
            <StrictMode>
                <AppRouter />
            </StrictMode>
        </ThemeProvider>
    );
});
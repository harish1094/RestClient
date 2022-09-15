import { useState } from "react";
import "./App.css";

import './css/app.css';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppNavBar from "./AppBar";



import Paper from '@mui/material/Paper';
import Home from "./Home";
export default function App() {
    const [darkMode, toggleDarkMode] = useState(false);
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: darkMode ? "#2563eb" : "#001e3c",
            },
            secondary: {
                main: darkMode ? "#2563eb" : "#001e3c",
            }
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <AppNavBar toggleDarkMode={() => toggleDarkMode(!darkMode)} />
            <Paper>
                <Home />
            </Paper>
        </ThemeProvider>
    )
}

//#aab4be
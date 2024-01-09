import React from 'react';
import { PaletteMode } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import ProviderProps from './ProviderProps';

export const ColorModeContext = React.createContext({
    mode: 'light' as PaletteMode,
    icon: <></>,
    text: '',
    toggleColorMode: () => {},
});

export function ColorModeProvider({ children }: ProviderProps) {
    const [mode, setMode] = React.useState<PaletteMode>(() => {
        // Check for stored preference in cookies
        const storedMode  = localStorage.getItem('colorMode');
        if (storedMode === 'dark' || storedMode === 'light') {
            return storedMode as PaletteMode;
        }

        // Check system default color scheme, or fallback to light
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        return prefersDarkMode ? 'dark' : 'light' as PaletteMode;
    });

    const toggleColorMode = React.useCallback(() => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }, []);


    React.useEffect(() => {
        // Store the color mode preference in cookies
        localStorage.setItem('colorMode', mode);
    }, [mode]);

    const contextValue = React.useMemo(() => {
        const icon = mode === 'dark' ? <Brightness7 color='inherit' /> : <Brightness4 color='inherit' />;
        const text = `${mode} mode`;

        return { mode, icon, text, toggleColorMode }
    }, [mode, toggleColorMode]);

    return (
        <ColorModeContext.Provider value={contextValue}>
            {children}
        </ColorModeContext.Provider>
    );
}

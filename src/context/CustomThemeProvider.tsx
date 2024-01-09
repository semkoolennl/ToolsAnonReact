import React, { useContext } from 'react';
import { createTheme, ThemeProvider as BaseProvider } from '@mui/material/styles';
import { ColorModeContext } from './ColorModeProvider';
import ProviderProps from './ProviderProps';
import { PaletteMode } from '@mui/material';

const darkTheme = {
    background: {
        paper: '#212121',
        paperbg: '#424242',
    }
};

const lightTheme = {
    background: {
        // just a little bit darker than the default
        paper: '#f5f5f5',
        paperbg: '#e0e0e0',
    }
};

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'dark' ? darkTheme : lightTheme),
    },
});

export function CustomThemeProvider({ children }: ProviderProps) {
    const { mode } = useContext(ColorModeContext);

    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <BaseProvider theme={theme}>
            {children}
        </BaseProvider>
    );
}

import * as React from 'react';
import ProviderProps from './ProviderProps';

export const DrawerModeContext = React.createContext({
    open: true as boolean,
    toggleDrawer: () => {},
});

export function DrawerModeProvider({ children }: ProviderProps) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = React.useCallback(() => {
        setOpen((prevState: boolean) => (!prevState));
    }, []);

    const contextValue = React.useMemo(() => ({ open, toggleDrawer }), [open, toggleDrawer]);

    return (
        <DrawerModeContext.Provider value={contextValue}>
            {children}
        </DrawerModeContext.Provider>
    );
}
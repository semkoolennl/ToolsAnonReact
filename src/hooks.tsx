import { useContext } from 'react';
import { ApiClientContext, AuthContext, ColorModeContext, DrawerModeContext } from './context';

export function useApi() {
    return useContext(ApiClientContext);
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useColorMode() {
    return useContext(ColorModeContext)
}

export function useDrawerMode() {
    return useContext(DrawerModeContext)
}


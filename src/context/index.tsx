import { useContext } from "react";
import { ApiClientProvider, ApiClientContext} from "./ApiClientProvider";
import { AuthProvider, AuthContext } from "./AuthProvider";
import { ColorModeProvider, ColorModeContext } from "./ColorModeProvider";
import { CustomThemeProvider } from "./CustomThemeProvider";
import { DrawerModeProvider, DrawerModeContext } from "./DrawerModeProvider";
import ProviderWrapper from "./ProviderWrapper";

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


export {
    ApiClientProvider,
    ApiClientContext,
    AuthProvider,
    AuthContext,
    ColorModeProvider,
    ColorModeContext,
    CustomThemeProvider,
    DrawerModeProvider,
    DrawerModeContext,
    ProviderWrapper
}

export default ProviderWrapper;
import { ColorModeProvider, CustomThemeProvider, DrawerModeProvider, ApiClientProvider, AuthProvider } from ".";
import ProviderProps from "./ProviderProps";

export default function ProviderWrapper({ children }: ProviderProps) {
    return (
        <ColorModeProvider>
            <CustomThemeProvider>
                <ApiClientProvider>
                    <AuthProvider>
                        <DrawerModeProvider>
                            {children}
                        </DrawerModeProvider>
                    </AuthProvider>
                </ApiClientProvider>
            </CustomThemeProvider>
        </ColorModeProvider>
    )
}